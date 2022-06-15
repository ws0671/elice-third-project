import { useNavigate } from "react-router-dom";
import { Grid, InputBase, Pagination, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import PostData from "./PostData";
import * as Api from "../../api";

import { WritePost } from "./NewPostsStyle";

const Newposts = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.value);

    const [allContents, setAllContents] = useState(undefined);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState(undefined);
    const [finalPage, setFinalPage] = useState(undefined);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const res = await Api.get("boards");
            setAllContents(res.data);
        };
        fetchData();
        setSearchData(undefined);
    }, []);

    const pageHandler = (e, value) => {
        setPage(value);
        paginationHandler();
    };

    useEffect(() => {
        if (search && searchData) {
            paginationHandler();
        }
    }, [page]);

    useEffect(() => {
        setPage(1);
    }, [search]);

    // 검색어로 게시글 찾기

    const searchHandler = async () => {
        await Api.getQuery("boards/search", {
            params: {
                title: search,
                page: page,
                perPage: 10,
                sort: "date",
                direction: 1,
            },
        }).then((res) => {
            setSearchData(res.data.searchList);
            setFinalPage(res.data.finalPage);
            console.log(searchData);
            setPage(1);
        });
    };

    const paginationHandler = async () => {
        try {
            await Api.getQuery(
                "boards/search",
                {
                    params: {
                        title: search,
                        page: page,
                        perPage: 10,
                        sort: "date",
                        direction: 1,
                    },
                },
                { withCredentials: true }
            ).then((res) => {
                setSearchData(res.data.searchList);
                setFinalPage(res.data.finalPage);
            });
        } catch {
            alert("일치하는 게시글이 없습니다.");
        }
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
                                searchHandler();
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
                {searchData?.length >= 1 ? (
                    <>
                        {searchData?.map((content, idx) => (
                            <PostData key={idx} content={content} />
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
                            <PostData key={idx} content={content} />
                        ))}
                    </>
                )}
            </Grid>
        </>
    );
};

export default Newposts;
