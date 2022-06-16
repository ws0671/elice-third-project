import { Grid, Button, InputBase } from "@mui/material";
import { Container } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PostingEditor from "./PostingEditor";
import CommentDetail from "./CommentData";
import PostAuthor from "./PostAuthor";

import * as Api from "../../api";

import {
    Left,
    Right,
    Title,
    Content,
    PostImg,
    PostTag,
    PostInfo,
    Comment,
    CommentWrite,
    Tag,
    Comments,
} from "./PostStyle";

const Post = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.value);
    const params = useParams();
    const [post, setPost] = useState("");
    const [allComment, setAllComment] = useState(undefined);
    const [WriteComment, setWriteComment] = useState("");
    const [postEdit, setPostEdit] = useState(false);
    const [like, setLike] = useState(undefined);

    console.log(user);
    const fetchData = async () => {
        const res = await Api.get(`boards/${params.boardId}`);
        setPost(res.data);
        console.log(post);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchCommentData = async () => {
        await Api.get(`comments/${params.boardId}`)
            .then((res) => {
                setAllComment(res.data);
            })
            .then(() => {
                if (allComment) {
                    messagesEndRef.current.scrollIntoView({
                        behavior: "smooth",
                    });
                }
            });
    };

    useEffect(() => {
        fetchCommentData();
    }, []);

    const messagesEndRef = useRef(null);

    const submitComment = async (e) => {
        e.preventDefault();
        Api.post("comments", {
            boardId: params.boardId,
            authorId: user.userId,
            content: WriteComment,
        })
            .then(fetchCommentData)
            .then(setWriteComment(""));
    };

    const fetchLikeData = async () => {
        try {
            await Api.get("likes").then((res) => {
                setLike(res.data.boardIdArray);
                console.log("여기", res.data);
            });
        } catch (err) {
            console.log(err);
        }
    };
    const handleLikeClick = async () => {
        await Api.put("likes", {
            boardId: post.boardId,
        })
            .then(fetchLikeData)
            .then(fetchData);
    };
    useEffect(() => {
        fetchLikeData();
    }, []);

    return (
        <>
            {post && like && allComment && (
                <Container
                    max-width="lg"
                    style={{
                        display: "flex",
                        paddingTop: "105px",
                        justifyContent: "space-between",
                        paddingBottom: "50px",
                    }}
                >
                    {!postEdit ? (
                        <>
                            <Left>
                                <PostAuthor
                                    post={post}
                                    setPostEdit={setPostEdit}
                                />
                                <Grid
                                    style={{
                                        display: "flex",
                                        minHeight: "550px",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        padding: "1% 3%",
                                    }}
                                >
                                    <Grid>
                                        <Title>{post.title}</Title>
                                        {post?.imageUrl && (
                                            <PostImg>
                                                <img
                                                    src={post.imageUrl}
                                                    alt="이미지 없음"
                                                    style={{
                                                        width: "100%",
                                                        borderRadius: "10px",
                                                    }}
                                                />
                                            </PostImg>
                                        )}
                                        <Content>{post.content}</Content>
                                    </Grid>
                                    <Grid>
                                        <PostTag>
                                            {post?.hashTagArray.map((tag) => (
                                                <Tag key={tag}>{tag}</Tag>
                                            ))}
                                        </PostTag>
                                    </Grid>
                                </Grid>
                            </Left>
                            <Right>
                                <PostInfo>
                                    <Grid>
                                        <IconButton>
                                            {like?.includes(post.boardId) ? (
                                                <FavoriteIcon
                                                    sx={{
                                                        margin: "0 5%",
                                                        color: "white",
                                                    }}
                                                    onClick={(e) => {
                                                        handleLikeClick();
                                                    }}
                                                />
                                            ) : (
                                                <FavoriteBorderIcon
                                                    sx={{
                                                        margin: "0 5%",
                                                        color: "white",
                                                    }}
                                                    onClick={(e) => {
                                                        handleLikeClick();
                                                    }}
                                                />
                                            )}
                                        </IconButton>
                                        {post.likeCount}
                                    </Grid>
                                    <Grid>
                                        <IconButton>
                                            <CloseIcon
                                                sx={{
                                                    margin: "0 5%",
                                                    color: "#EC9B3B",
                                                }}
                                                onClick={() => {
                                                    navigate("/board");
                                                }}
                                            />
                                        </IconButton>
                                    </Grid>
                                </PostInfo>
                                <Comments>
                                    {allComment?.map((commentData, idx) => (
                                        <Comment key={idx}>
                                            <CommentDetail
                                                commentData={commentData}
                                                fetchCommentData={
                                                    fetchCommentData
                                                }
                                            />
                                        </Comment>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </Comments>
                                <form onSubmit={submitComment}>
                                    <CommentWrite>
                                        <InputBase
                                            variant="standard"
                                            placeholder="댓글을 입력해 주세요."
                                            width="100%"
                                            value={WriteComment}
                                            onChange={(e) => {
                                                setWriteComment(e.target.value);
                                            }}
                                        />

                                        <Button
                                            type="submit"
                                            size="small"
                                            sx={{
                                                padding: "0",
                                                width: "15px",
                                            }}
                                        >
                                            입력
                                        </Button>
                                    </CommentWrite>
                                </form>
                            </Right>
                        </>
                    ) : (
                        <>
                            <PostingEditor
                                post={post}
                                setPostEdit={setPostEdit}
                                fetchData={fetchData}
                            />
                        </>
                    )}
                </Container>
            )}
        </>
    );
};

export default Post;
