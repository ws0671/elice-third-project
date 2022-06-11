import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid, InputBase } from "@mui/material";
import { StylesProvider } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import react, { useEffect, useState } from "react";
import * as Api from "../../api";

import {
    PostList,
    PostUserImg,
    PostUserInfo,
    PostInfo,
    PostSubInfo,
    ListName,
    ListDate,
    ListTitle,
    WritePost,
    Tag,
    Count,
} from "./NewPostsStyle";

const Newposts = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.value);

    const [allContents, setAllContents] = useState(undefined);

    useEffect(() => {
        async function fetchData() {
            const res = await Api.get("boards");
            setAllContents(res.data);
        }
        fetchData();
        console.log(allContents);
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
                        <>
                            <StylesProvider injectFirst>
                                <WritePost
                                    style={{
                                        fontSize: "14px",
                                        margin: "2px",
                                        fontWeight: "bold",
                                    }}
                                    onClick={() => {
                                        navigate("/postEditor");
                                    }}
                                >
                                    글쓰기
                                </WritePost>
                            </StylesProvider>
                        </>
                    )}
                </Grid>
            </Grid>
            <Grid>
                {allContents?.map((content, idx) => (
                    <PostList
                        container
                        key={idx}
                        onClick={() => {
                            navigate("/post");
                        }}
                    >
                        <PostUserImg
                            style={{
                                backgroundImage:
                                    "url(http://www.urbanbrush.net/web/wp-content/uploads/edd/2019/01/urbanbrush-20190108131811238895.png)",
                                backgroundSize: "100% 100%",
                                backgroundRepeat: "no-repeat",
                            }}
                        />
                        <PostUserInfo>
                            <ListName>{content.authorId}</ListName>
                            <ListDate>{content.createdAt}</ListDate>
                        </PostUserInfo>
                        <PostInfo>
                            <ListTitle>{content.title}</ListTitle>
                            <Grid style={{ display: "flex" }}>
                                {content.hashTagArray?.map((tag, index) => (
                                    <Tag key={index}>{tag}</Tag>
                                ))}
                            </Grid>
                        </PostInfo>
                        <PostSubInfo>
                            <VisibilityIcon />
                            <Count> {content.viewCount} </Count>
                            <FavoriteIcon />
                            <Count> {content.likeCount} </Count>
                        </PostSubInfo>
                    </PostList>
                ))}
            </Grid>
        </>
    );
};

export default Newposts;
