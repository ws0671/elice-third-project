import { Grid, ButtonBase, InputBase } from "@mui/material";
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
    const [like, setLike] = useState([]);

    const fetchData = async () => {
        const res = await Api.get(`boards/${params.boardId}`);
        setPost(res.data);
        console.log("게시글 데이터", res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 댓글 데이터 들고오기
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
        console.log("여기 왜 안나옴?", allComment);
    }, []);

    const messagesEndRef = useRef(null);

    // 댓글 제출 post
    const submitComment = async (e) => {
        e.preventDefault();
        await Api.post("comments", {
            boardId: params.boardId,
            authorId: user.userId,
            content: WriteComment,
        })
            .then(() => {
                fetchCommentData();
                console.log("댓글 입력");
            })
            .then(setWriteComment(""));
    };

    // 좋아요 데이터 불러오기
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

    // 좋아요 클릭 핸들러
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
                                        <IconButton
                                            onClick={() => {
                                                handleLikeClick();
                                            }}
                                        >
                                            {like?.includes(post.boardId) ? (
                                                <FavoriteIcon
                                                    sx={{
                                                        margin: "0 5%",
                                                        color: "white",
                                                    }}
                                                />
                                            ) : (
                                                <FavoriteBorderIcon
                                                    sx={{
                                                        margin: "0 5%",
                                                        color: "white",
                                                    }}
                                                />
                                            )}
                                        </IconButton>
                                        {post.likeCount}
                                    </Grid>
                                    <Grid>
                                        <IconButton
                                            onClick={() => {
                                                navigate("/board");
                                            }}
                                        >
                                            <CloseIcon
                                                sx={{
                                                    margin: "0 5%",
                                                    color: "#EC9B3B",
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

                                        <ButtonBase
                                            type="submit"
                                            size="small"
                                            sx={{
                                                width: "45px",
                                                fontWeight: "bold",
                                                color: "white",
                                                backgroundColor: "#A0A083",
                                                borderRadius: "10px",
                                            }}
                                        >
                                            입력
                                        </ButtonBase>
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
