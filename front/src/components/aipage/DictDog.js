import { useState } from "react";
import styled from "styled-components";
import { Box, Tab, Grid, InputBase, } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import DictList from "./DictList";
import DictView from "./DictView";

const DictDog = () => {
    // const [search, setSearch] = useState("");
    // const [searchData, setSearchData] = useState(null);
    // const [page, setPage] = useState(1);
    // const [sort, setSort] = useState("date");

    // const searchHandler = async () => {
    //     // await Api.getQuery("boards/search", {
    //     //     params: {
    //     //         title: search,
    //     //         page: page,
    //     //         perPage: 10,
    //     //         sort: sort,
    //     //         direction: -1,
    //     //     },
    //     // }).then((res) => {
    //     //     setSearchData(res.data.searchList);
    //     //     setFinalPage(res.data.finalPage);
    //     // });
    // };

    return (
        <>
            {/* <div>
                여기는 DictDog 입니다.
            </div> */}
            <Grid style={{ display: "flex", justifyContent: "space-between" }}>
                {/* <Grid style={{ position: "relative" }}>                    */}
                <Grid item md={3} sm={12} xs={12} style={{marginRight:"24px"}}>
                    <DictList />
                </Grid>
                <Grid item md={9} sm={12} xs={12}>

                    <DictView />
                </Grid>
            </Grid>
            </>
    );
}

export default DictDog;
