import { useNavigate } from "react-router-dom";
import { Grid, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PostData from "./PostData";
import * as Api from "../../api";

import { WritePost } from "./NewPostsStyle";

const Newposts = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.value);

    const [allContents, setAllContents] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const res = await Api.get("boards");
            setAllContents(res.data);
        };
        fetchData();
    }, []);

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
                <Grid sx={{ position: "relative" }}>
                    <SearchIcon
                        sx={{
                            color: "white",
                            fontSize: "25px",
                            position: "absolute",
                            top: "20%",
                        }}
                    />
                    <InputBase
                        placeholder="검색어를 입력하세요."
                        sx={{ color: "white", margin: "7px  0 0 25px" }}
                    />
                    {user && (
                        <WritePost
                            sx={{
                                fontSize: "14px",
                                margin: "2px",
                                fontWeight: "bold",
                                color: "white",
                                border: "solid 1px",
                                p: "0",
                                m: "2px",
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
                {allContents?.map((content) => (
                    <PostData key={content} content={content} />
                ))}
            </Grid>
        </>
    );
};

export default Newposts;
