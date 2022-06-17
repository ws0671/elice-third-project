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
    const [author, setAuthor] = useState(undefined);

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
                    <PostUserImg
                        style={{
                            backgroundImage: `url(${author?.imageUrl})`,
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                        }}
                    />
                    <PostUserInfo>
                        <ListName>
                            {author.name.length > 10 ? (
                                <>{author.name.slice(0, 10) + "..."}</>
                            ) : (
                                <>{author.name}</>
                            )}
                        </ListName>
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
