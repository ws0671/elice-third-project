import { useState } from "react";

import styled from "styled-components";
import { Box, Tab, Grid, InputBase, } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DictListItem from "./DictListItem";

const dummyList = [
    '강아지 1',
    '강아지 2',
    '강아지 3',
    '강아지 4',
    '강아지 5',
    '동네 똥강아지 6',
    '골든 리트리버 7',
    '골든 리트리버 8',
    '골든 리트리버 9',
    '골든 리트리버 10',
    '골든 리트리버 11',
    '골든 리트리버 12',
    '13 진돗개',
    '14 진돗개',
    '15 진돗개',
    '16 진돗개',
    '17 진돗개',
    '18 진돗개',
    '19 진돗개',
    '20 진돗개',
];
const dummyListCat = [
    '아깽이',
    '고양이',
    '길냥이',
    '개냥이',
];

const DictList = () => {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("date");

    const DrawList = ({datalist}) => {
        
        return(
            <>
                {datalist?.map((content) => (
                    <DictListItem key={content} title={content} />
                ))}
            </>
        );
    }

    const searchHandler = async () => {
        // await Api.getQuery("boards/search", {
        //     params: {
        //         title: search,
        //         page: page,
        //         perPage: 10,
        //         sort: sort,
        //         direction: -1,
        //     },
        // }).then((res) => {
        //     setSearchData(res.data.searchList);
        //     setFinalPage(res.data.finalPage);
        // });
    };
    return (
        // <ListContainer item md={3} sm={12} xs={12} style={{marginRight:"24px"}}>
        <Grid item md={3} sm={12} xs={12}>
            <ListContainer>
                {/* 사전 리스트입니다. */}
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
                                    if (search.length > 0) {
                                        setSort("date");
                                        searchHandler();
                                        setPage(1);
                                    }
                                }
                            }}
                        />
                    </GridwithUnderline>
                    {/* <DrawList datalist={dummyList} /> */}
                    <DrawList datalist={dummyListCat} />
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

// border-top: solid 1px #d9d9d9;

const GridwithUnderline = styled(Grid)`
    border-bottom: solid 1px #d9d9d9;
    width: 100%;
    // padding: 2px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
`;