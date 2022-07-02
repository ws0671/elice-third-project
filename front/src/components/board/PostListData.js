import React, { useEffect, useState } from "react";
import * as Api from "../../api";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

import {
    PostList,
    PostUserImg,
    PostUserInfo,
    PostInfo,
    PostSubInfo,
    ListName,
    ListDate,
    ListTitle,
    Tag,
    Count,
} from "./PostsStyle";

const PostData = ({ content }) => {
    const user = useSelector((state) => state.auth.value);
    const navigate = useNavigate();
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        setAuthor(content.author);
    }, [content]);

    return (
        <>
            {author && (
                <PostList
                    container
                    key={content.boardId}
                    onClick={() => {
                        if (user) {
                            navigate(`/post/${content.boardId}`);
                        } else {
                            alert("로그인을 한 후 서비스를 이용해주세요.");
                        }
                    }}
                >
                    <Grid container item lg={10} md={10} sm={12} xs={12}>
                        <PostUserImg
                            style={{
                                backgroundImage: `url(${author?.imageUrl})`,
                                backgroundSize: "100% 100%",
                                backgroundRepeat: "no-repeat",
                            }}
                        />
                        <PostUserInfo item lg={3} md={2.5} sm={2.5} xs={9.5}>
                            <ListName>{author.name}</ListName>
                            <ListDate>
                                {content.createdAt.slice(0, 10)}
                            </ListDate>
                        </PostUserInfo>
                        <PostInfo item lg={8} md={8} sm={8} xs={12}>
                            <ListTitle>{content.title}</ListTitle>
                            <Grid
                                style={{
                                    display: "flex",
                                    overflow: "hidden",
                                }}
                            >
                                {content.hashTagArray?.map((tag, index) => (
                                    <Tag key={index}>{tag}</Tag>
                                ))}
                            </Grid>
                        </PostInfo>
                    </Grid>
                    <PostSubInfo item lg={2} md={2} sm={3} xs={8}>
                        <VisibilityIcon />
                        <Count> {content.viewCount} </Count>
                        <FavoriteIcon />
                        <Count> {content.likeCount} </Count>
                    </PostSubInfo>
                </PostList>
            )}
        </>
    );
};
export default PostData;
