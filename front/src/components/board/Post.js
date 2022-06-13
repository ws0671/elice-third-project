import { Grid, Button, InputBase } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState, useRef } from "react";
import PostingEditor from "./PostingEditor";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import CommentDetail from "./CommentData";
import PostUser from "./PostUser";
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

    useEffect(() => {
        const fetchData = async () => {
            const res = await Api.get(`boards/${params.boardId}`);
            setPost(res.data);
        };
        fetchData();
    }, []);

    const fetchCommentData = async () => {
        const res = await Api.get(`comments/${params.boardId}`);
        setAllComment(res.data);
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
        });
        setWriteComment("");
        fetchCommentData();
        messagesEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    };

    return (
        <>
            {post && (
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
                                <PostUser
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
                                        {post.imageUrl && (
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
                                            <FavoriteBorderIcon
                                                sx={{
                                                    margin: "0 5%",
                                                    color: "white",
                                                }}
                                            />
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
                                setPost={setPost}
                                setPostEdit={setPostEdit}
                                postEdit={postEdit}
                            />
                        </>
                    )}
                </Container>
            )}
        </>
    );
};

export default Post;
