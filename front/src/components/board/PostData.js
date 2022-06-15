import React, { useEffect, useState } from "react";
import * as Api from "../../api";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Grid } from "@mui/material";

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
} from "./NewPostsStyle";

const PostData = ({ content }) => {
    const navigate = useNavigate();
    const authorId = content.authorId;
    const [author, setAuthor] = useState("");

    useEffect(() => {
        const getUserData = async () => {
            const res = await Api.get("users", authorId);
            setAuthor(res.data);
        };
        getUserData();
    }, []);

    return (
        <>
            {author && (
                <PostList
                    container
                    key={content.boardId}
                    onClick={() => {
                        navigate(`/post/${content.boardId}`);
                    }}
                >
                    <PostUserImg
                        style={{
                            backgroundImage: `url(${author?.imageUrl})`,
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                        }}
                    />
                    <PostUserInfo>
                        <ListName>{author.name}</ListName>
                        <ListDate>{content.createdAt.slice(0, 10)}</ListDate>
                    </PostUserInfo>
                    <PostInfo>
                        <ListTitle>
                            {content.title.length > 25 ? (
                                <>{content.title.substr(0, 25) + "..."}</>
                            ) : (
                                <>{content.title}</>
                            )}
                        </ListTitle>
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
            )}
        </>
    );
};
export default PostData;
