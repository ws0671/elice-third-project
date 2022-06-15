import { useNavigate } from "react-router-dom";
import { Grid, InputBase } from "@mui/material";
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

    useEffect(() => {
        const fetchData = async () => {
            const res = await Api.get("boards");
            setAllContents(res.data);
        };
        fetchData();
    }, []);

    // 검색어로 게시글 찾기
    const searchHandler = async (e) => {
        // e.preventDefault();
        // await Api.getQuery("boards/search", {
        //     params: {
        //         title: search,
        //     },
        // }).then((res) => {
        //     setSearchData(res.data);
        //     console.log(searchData);
        // });
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
                    <form onSubmit={searchHandler}>
                        <InputBase
                            placeholder="검색어를 입력하세요."
                            sx={{ color: "white", margin: "7px" }}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                    </form>
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
                {searchData ? (
                    <>
                        {searchData?.map((content, idx) => (
                            <PostData key={idx} content={content} />
                        ))}
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
