import { useNavigate } from "react-router-dom";
import { Grid, InputBase, Pagination, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import PostListData from "./PostListData";
import * as Api from "../../api";
import { styled } from "@mui/material/styles";

import { PostList, SortGrid, WritePost } from "./PostsStyle";

const SortButton = styled(Button)({
    fontSize: 12,
    color: "gray",
    margin: "0 5px",
    "&:hover": {
        fontWeight: "bold",
    },
});

const Newposts = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.value);

    const [allContents, setAllContents] = useState(undefined);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState(undefined);
    const [finalPage, setFinalPage] = useState(undefined);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("date");

    useEffect(() => {
        fetchData();
    }, []);

    const pageHandler = (e, value) => {
        setPage(value);
        searchHandler();
    };

    useEffect(() => {
        if (search && searchData) {
            searchHandler();
        }
    }, [page]);

    useEffect(() => {
        if (search) {
            setPage(1);
            searchHandler();
        } else {
            fetchData();
        }
    }, [sort]);

    // 검색어로 게시글 찾기
    const searchHandler = async () => {
        await Api.getQuery("boards/search", {
            params: {
                title: search,
                page: page,
                perPage: 10,
                sort: sort,
                direction: -1,
            },
        }).then((res) => {
            setSearchData(res.data.searchList);
            setFinalPage(res.data.finalPage);
        });
    };

    // 페이지네이션 핸들러
    // const paginationHandler = async () => {
    //     await Api.getQuery(
    //         "boards/search",
    //         {
    //             params: {
    //                 title: search,
    //                 page: page,
    //                 perPage: 10,
    //                 sort: sort,
    //                 direction: -1,
    //             },
    //         },
    //         { withCredentials: true }
    //     ).then((res) => {
    //         setSearchData([...res.data.searchList]);
    //         setFinalPage(res.data.finalPage);
    //     });
    // };

    // 전체 게시물 조회 (query 사용)
    const fetchData = async () => {
        await Api.getQuery("boards", {
            params: {
                sort: sort,
                direction: -1,
            },
        }).then((res) => {
            setAllContents(res.data);
            setSearchData(undefined);
        });
    };

    return (
        <>
            <Grid
                container
                style={{
                    borderRadius: "10px",
                    backgroundColor: "#386150",
                    justifyContent: "space-between",
                    padding: "0px 10px",
                    width: "100%",
                    height: "45px",
                    overflow: "hidden",
                }}
            >
                <Grid
                    style={{
                        fontSize: "17px",
                        color: "white",
                        margin: "10px",
                        minWidth: "500px",
                    }}
                >
                    질문을 통해 궁금한 점을 해결하고 다양한 정보를 얻어가세요!
                </Grid>
                <Grid style={{ display: "flex" }}>
                    <SearchIcon
                        sx={{
                            color: "white",
                            fontSize: "25px",
                            margin: "9px 0",
                        }}
                    />

                    <InputBase
                        placeholder="검색어를 입력하세요."
                        sx={{ color: "white", margin: "7px" }}
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
                </Grid>
                <Grid>
                    {user && (
                        <WritePost
                            sx={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: "white",
                                border: "solid 1px",
                                p: "0",
                                m: "8px 0",
                                "&:hover": {
                                    backgroundColor: "#FDF6F0",
                                    color: "#386150",
                                },
                            }}
                            onClick={() => {
                                navigate("/postEditor");
                            }}
                        >
                            글쓰기
                        </WritePost>
                    )}
                </Grid>
            </Grid>
            <Grid>
                <SortGrid>
                    <SortButton
                        onClick={() => {
                            setSort("date");
                        }}
                    >
                        최신순
                    </SortButton>
                    <SortButton
                        onClick={() => {
                            setSort("like");
                        }}
                    >
                        하트순
                    </SortButton>
                    <SortButton
                        onClick={() => {
                            setSort("view");
                        }}
                    >
                        조회순
                    </SortButton>
                </SortGrid>
                {searchData ? (
                    <>
                        {searchData?.map((content, idx) => (
                            <PostListData
                                key={idx}
                                content={content}
                                user={user}
                            />
                        ))}
                        <Grid style={{ display: "flex", margin: "10px" }}>
                            <Pagination
                                count={finalPage}
                                page={page}
                                onChange={pageHandler}
                                style={{
                                    margin: "10px auto",
                                }}
                            />
                        </Grid>
                    </>
                ) : (
                    <>
                        {allContents?.map((content, idx) => (
                            <PostListData key={idx} content={content} />
                        ))}
                    </>
                )}
            </Grid>
        </>
    );
};

export default Newposts;
