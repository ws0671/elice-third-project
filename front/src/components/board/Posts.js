import { useNavigate } from "react-router-dom";
import { Grid, InputBase, Pagination, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import PostListData from "./PostListData";
import * as Api from "../../api";
import { SortGrid, WritePost, SortButton } from "./PostsStyle";
import { DefaultBtn, NegativeBtn } from "../common/Buttons";

const Newposts = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.value);

    const [allContents, setAllContents] = useState(null);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [finalPage, setFinalPage] = useState(null);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("date");
    const [selectedSort, setSelectedSort] = useState(1);

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
            <SortGrid>
                <SortButton
                    onClick={() => {
                        setSearchData(null);
                        setSearch("");
                        setSelectedSort(1);
                    }}
                    style={
                        selectedSort === 1
                            ? { borderBottom: "solid 3px #65949E" }
                            : {}
                    }
                >
                    ALL
                </SortButton>
                <SortButton
                    onClick={() => {
                        setSort("date");
                        setSelectedSort(2);
                    }}
                    style={
                        selectedSort === 2
                            ? { borderBottom: "solid 3px #65949E" }
                            : {}
                    }
                >
                    최신순
                </SortButton>
                <SortButton
                    onClick={() => {
                        setSort("like");
                        setSelectedSort(3);
                    }}
                    style={
                        selectedSort === 3
                            ? { borderBottom: "solid 3px #65949E" }
                            : {}
                    }
                >
                    하트순
                </SortButton>
                <SortButton
                    onClick={() => {
                        setSort("view");
                        setSelectedSort(4);
                    }}
                    style={
                        selectedSort === 4
                            ? { borderBottom: "solid 3px #65949E" }
                            : {}
                    }
                >
                    조회순
                </SortButton>
            </SortGrid>
            <Grid style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid style={{ position: "relative" }}>
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
                </Grid>

                <Grid>
                    {user && (
                        <DefaultBtn
                            onClick={() => {
                                navigate("/postEditor");
                            }}
                        >
                            <div className="btnText">글쓰기</div>
                        </DefaultBtn>
                    )}
                </Grid>
            </Grid>
            <Grid>
                {searchData ? (
                    <>
                        {searchData?.map((content) => (
                            <PostListData key={content} content={content} />
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
                        {allContents?.map((content) => (
                            <PostListData key={content._id} content={content} />
                        ))}
                    </>
                )}
            </Grid>
        </>
    );
};

export default Newposts;
