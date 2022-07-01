// import * as React from 'react';

import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

import styled from "styled-components";
import { 
    Pagination, 
    Grid, 
    InputBase, 
    ListItemButton, 
    List 
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import * as Api from "../../api";


//페이당 출력 리스트 갯수
const perPage = 14;

const DictList = ({type = 'dogs', setCurContent}) => {
    // const user = useSelector((state) => state.auth.value);

    const [curContentId, setCurContentId] = useState(1);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [page, setPage] = useState(1);
    const [finalPage, setFinalPage] = useState(null);
 
    useEffect(() => {
        searchHandler();
    }, []);

    const pageHandler = (e, value) => {
        setPage(value);
        searchHandler(value);
    };

    useEffect(() => {
        if (search && searchData) {
            searchHandler();
        }
    }, [page]);


    const DrawList = () => {
        console.log('here is dict list, DrawList');
        return(
            <List component="nav" aria-label="secondary mailbox folder">
                {searchData?.map((content) => (
                    <ListItemButton
                    divider
                    key={content.id}
                    name={content.nameKor}
                    selected={curContentId === parseInt(content.id)}
                    onClick={(event) => handleListItemClick(event, parseInt(content.id), content)}
                    >
                        {content.nameKor}
                    </ListItemButton>
                ))}
            </List>
        );
  
    }

    const handleListItemClick = (event, index, content) => {
        setCurContentId(index);
        setCurContent(content);
      };

    const searchHandler = async (pageno=1) => {
        
        // 전처리 : 문자열뒤 공백제거
        // 입력값 없을 경우 초기 상태 로드위해 빈문자열 대입
        let searchWord = search.replace(/^\s+|\s+$/gm,'');
        // 전체리스트 다시부르게 되는 경우 1번 컨텐츠로 이동..????
        if (search.length == 0) {setCurContentId(1);}
         
        await Api.getQuery(type + "/search", {
            params: {            
                name: searchWord,
                page: pageno,
                perPage: perPage,
            },
        }).then((res) => {
            setSearchData(res.data.searchList);
            setFinalPage(res.data.lastPage);
   
        });
    };

      // 전체 게시물 조회 (query 사용)
    const fetchData = async () => {

        await Api.getQuery(type + "/search", {
            params: {
                name: '',
                page: page,
                perPage: perPage,
            },
        }).then((res) => {
            console.log(res);

            setSearchData(res.data.searchList);
            setFinalPage(res.data.lastPage);
        });
    };

    return (
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
    );
}

export default DictList;

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