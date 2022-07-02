import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styled from "styled-components";

import { 
  Pagination, 
  Box,
  Tab,
  Grid, 
  InputBase, 
  ListItemButton, 
  List 
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import { DefaultBtn } from "../common/Buttons";

import * as Api from "../../api";
import DictView from "./DictView";

//페이당 출력 리스트 갯수
const perPage = 14;

const BreedDicts = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [value, setValue] = useState(params.type || 'dogs');
    const [curContent, setCurContent] = useState('');

    const [curContentId, setCurContentId] = useState(1);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [page, setPage] = useState(1);
    const [finalPage, setFinalPage] = useState(null);
    const [isSearchByKeyword, setIsSearchByKeyword] = useState(false);

    //디폴트 상태 데이터 받아오기
    useEffect(() => {
      //param에 name이 있는 경우. (품종 분석에서 이동해오는 경우)
      //search 값에 name 입력
      console.log('==============init or tab value change =================');
      let searchName = '';
      if(params?.name) {
        console.log('param name is exist, ', params.name);
        console.log('value?', value);
        searchName = params.name;
      };
      fetchData(searchName);
    }, [value]);

    //서치 시 데이터 받아오기
    useEffect(() => {
      if (isSearchByKeyword && search && searchData) {
          console.log('==============useEffect, search Handler=================');
          searchHandler(page);
      }
    }, [page]);


    const handleTabChange = (event, newValue) => {
      event.preventDefault();  
      setValue(newValue);
      setIsSearchByKeyword(false);
      setSearch('');
      console.log(newValue);
      navigate('/dict/'+newValue);
        
    };

    const handleListItemClick = (event, index, content) => {
      setCurContentId(index);
      setCurContent(content);
    };

    const pageHandler = (e, pageno) => {
      setPage(pageno);
      searchHandler(pageno);
  };

  const searchHandler = async (pageno=1) => {
    console.log('===this serachHandler==');
    let keyword ='';
    if(isSearchByKeyword) {keyword = search.replace(/^\s+|\s+$/gm,'');}
    fetchData(keyword, pageno);
    
  };

  const handleclickRefresh = (e) => {
    e.preventDefault();
    setSearch('');
    setPage(1);
    setCurContentId(1);
    setIsSearchByKeyword(false);
    fetchData(''); 
  }

  const fetchData = async (searchName='', pageno = 1) => {
    console.log('===this fetchData==');
    console.log('name : ',search.replace(/^\s+|\s+$/gm,''));
  
    await Api.getQuery(value + "/search", {
        params: {
            name: searchName,
            page: pageno,
            perPage: perPage,
        },
    }).then((res) => {
        setSearchData(res.data.searchList);
        setFinalPage(res.data.lastPage);
        setCurContent(res.data.searchList[0]);
    });
  };


  const DrawList = () => {
    return(
        <List component="nav" aria-label="secondary mailbox folder">
            {searchData?.map((content) => (
                <ListItemButton
                divider
                key={content.id}
                name={content.nameKor}
                selected={(curContentId === parseInt(content.id))}
                onClick={(event) => handleListItemClick(event, parseInt(content.id), content)}
                >
                    {content.nameKor}
                </ListItemButton>
            ))}
        </List>
      );
  };

    
    return (
        <> 
            <TabContext value={value}>
       
                <Box
                    sx={{
                    position: "relative",
                    }}
                >
                    <CategoryTabList
                    onChange={handleTabChange}
                    aria-label="map tab list"
                    >
                        <CategoryTab label="강아지" value="dogs" />
                        <CategoryTab label="고양이" value="cats" />
                        
                        <BackBtn onClick={(e) => {
                          e.preventDefault();
                          navigate(-1);
                        }}>뒤로가기</BackBtn>
                    </CategoryTabList>
                   
                </Box>
                
                <TabPanel
                    value={value}
                    sx={{
                    backgroundColor: "white",
                    borderRadius: "0px 10px 10px 10px",
                    boxShadow: "2px 2px 10px #d9d9d9",
                    }}
                >
                    <Grid container>
                        <Grid item md={12} sm={12} xs={12} sx={{ minHeight: "600px" }}>
                            <Grid container>
                                <Grid item md={3} sm={12} xs={12} pr={1} >
                                  <ListContainer>
                                      <Grid style={{ position: "relative" }}>
                                          <GridwithUnderline>
                                              <SearchIcon
                                                  sx={{
                                                      fontSize: "25px",
                                                  }}
                                                  style={{ position: "absolute", top: "10px" }}
                                              />

                                              <InputBase
                                                  placeholder="검색어를 입력하세요."
                                                  sx={{ margin: "6px 30px" }}
                                                  value={search}
                                                  onChange={(e) => setSearch(e.target.value)}
                                                  onKeyDown={(e) => {
                                                      if (e.keyCode == 13) {
                                                          if (search.length >= 0) {

                                                              setIsSearchByKeyword(true);
                                                              fetchData(search);
                                                              setPage(1);
                                                          }
                                                      }
                                                  }}
                                              />
                                             
                                          </GridwithUnderline>
                                          <Grid sx={{display:'flex', justifyContent:'center'}}>
                                            <DefaultBtn 
                                            onClick={handleclickRefresh}>목록 초기화</DefaultBtn>
                                          </Grid>
                                          {searchData && <DrawList />}               
                                          
                                          <Grid style={{ display: "flex", margin: "10px" }}>
                                                  <Pagination
                                                      size="small"
                                                      siblingCount={0}
                                                      count={finalPage}
                                                      page={page}
                                                      onChange={pageHandler}
                                                      style={{
                                                          margin: "2px auto",
                                                      }}
                                                  />
                                              </Grid>
                                      </Grid>
                                  </ListContainer>
                              </Grid>

                              <DictView type={value} content={curContent}/>

                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>
            </TabContext>
            
        </>
        
    );
};

export default BreedDicts;

const BackBtn = styled(DefaultBtn)`
  && {
    position: absolute;
    right: 0px;
    bottom: 10px;
  }
`;

const CategoryTabList = styled(TabList)`
  && .MuiTabs-indicator {
    display: none;
  }
`;

const CategoryTab = styled(Tab)`
  && {
    background-color: #65949e;
    color: white;
    border-radius: 10px 10px 0px 0px;
    margin-right: 5px;
    font-size: 20px;
    font-family: "GangwonEdu_OTFBoldA";
  }

  &&.Mui-selected {
    color: black;
    background-color: white;
  }
`;

const ListContainer = styled(Grid)`
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 25px;
    
    justify-content: space-between;
    width: 100%;
    min-height: 640px;
    overflow: hidden;
    padding: 0 15px;
    cursor: pointer;
    box-shadow: 2px 2px 10px #d9d9d9;
`;

const GridwithUnderline = styled(Grid)`
    border-bottom: solid 1px #d9d9d9;
    width: 100%;
    // padding: 2px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
`;