import { Button, InputBase } from "@mui/material";
import { CommentName } from "./PostStyle";
import * as Api from "../../api";
import { useState } from "react";
import CommentButton from "./CommentButton";
import { useSelector } from "react-redux";

const CommentDetail = ({ commentData, fetchCommentData }) => {
    const user = useSelector((state) => state.auth.value);
    const [currentComment, setCurrentComment] = useState(commentData.content);
    const [commentEdit, setCommentEdit] = useState(false);

    const submitCommentEdit = (e) => {
        e.preventDefault();
        Api.put(`comments/${commentData.commentId}`, {
            content: currentComment,
        }).then(fetchCommentData);
        setCommentEdit(false);
    };

    return (
        <>
            <CommentName>{commentData.authorId}</CommentName>
            {commentEdit ? (
                <>
                    <form onSubmit={submitCommentEdit}>
                        <InputBase
                            variant="standard"
                            placeholder="댓글을 입력해 주세요."
                            width="100%"
                            value={currentComment}
                            onChange={(e) => {
                                setCurrentComment(e.target.value);
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
                    </form>
                    <br />
                </>
            ) : (
                <>
                    {commentData.content}
                    <br />
                    {commentData.authorId === user.userId && (
                        <CommentButton
                            commentData={commentData}
                            setCommentEdit={setCommentEdit}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default CommentDetail;
