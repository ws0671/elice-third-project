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

    //디폴트 상태 데이터 받아오기
    useEffect(() => {
       fetchData();
    }, []);

    //서치 시 데이터 받아오기
    useEffect(() => {
      if (search && searchData) {
          searchHandler();
      }
    }, [page]);

    useEffect(() => {
      searchHandler();

    }, [value]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        setSearch('');
        searchHandler();
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
    console.log('===this serachHandler');
    let searchWord = search.replace(/^\s+|\s+$/gm,'');
    // 전체리스트 다시부르게 되는 경우 1번 컨텐츠로 이동..????
    if (search.length == 0) {setCurContentId(1);}
     
    await Api.getQuery(value + "/search", {
        params: {            
            name: searchWord,
            page: pageno,
            perPage: perPage,
        },
    }).then((res) => {
        setSearchData(res.data.searchList);
        setFinalPage(res.data.lastPage);
        setCurContent(res.data.searchList[0]);
    });
  };

  const handleclickRefresh = (e) => {
    e.preventDefault();
    setSearch('');
    setPage(1);
    initData();
 
  }

  const initData = async () => {
    await Api.getQuery(value + "/search", {
        params: {
            name: '',
            page: 1,
            perPage: perPage,
        },
    }).then((res) => {
        setSearchData(res.data.searchList);
        setFinalPage(res.data.lastPage);
        setCurContent(res.data.searchList[0]);
    });
  };

  const fetchData = async () => {
    await Api.getQuery(value + "/search", {
        params: {
            name: params.name || '',
            page: 1,
            perPage: perPage,
        },
    }).then((res) => {
        // console.log(res);

        setSearchData(res.data.searchList);
        setFinalPage(res.data.lastPage);
        setCurContent(res.data.searchList[0]);
        // console.log('=====fetchData====',curContent);
    });
  };

  const DrawList = () => {
    console.log('here is dict list, DrawList');
    return(
        <List component="nav" aria-label="secondary mailbox folder">
            {searchData?.map((content) => (
                <ListItemButton
                divider
                key={content.id}
                name={content.nameKor}
                selected={(curContentId === parseInt(content.id))
                  // ||(params?.name === content.nameKor)
                }
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
                              {/* <DictList type={value} setCurContent={setCurContent}/> */}
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
                                                              searchHandler();
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