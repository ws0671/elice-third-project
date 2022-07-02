import { Button, InputBase } from "@mui/material";
import { CommentName } from "./PostStyle";
import * as Api from "../../api";
import { useState } from "react";
import CommentButton from "./CommentButton";
import { useSelector } from "react-redux";
import { DefaultBtn } from "../common/Buttons";

const CommentDetail = ({ commentData, fetchCommentData }) => {
    const user = useSelector((state) => state.auth.value);
    const [currentComment, setCurrentComment] = useState(commentData.content);
    const [commentEdit, setCommentEdit] = useState(false);

    const submitCommentEdit = (e) => {
        e.preventDefault();
        try {
            Api.put(`comments/${commentData.commentId}`, {
                content: currentComment,
            }).then(fetchCommentData);
            setCommentEdit(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <CommentName>{commentData.author.name}</CommentName>
            {commentEdit ? (
                <>
                    <form onSubmit={submitCommentEdit}>
                        <InputBase
                            variant="standard"
                            placeholder="댓글을 입력해 주세요."
                            value={currentComment}
                            sx={{
                                width: "100%",
                                borderBottom: "solid 1px #d9d9d9",
                                mb: "7px",
                                fontFamily: "GangwonEdu_OTFBoldA",
                            }}
                            onChange={(e) => {
                                setCurrentComment(e.target.value);
                            }}
                        />
                        <DefaultBtn type="submit">
                            {" "}
                            <div className="btnText">수정 완료</div>
                        </DefaultBtn>
                    </form>
                    <br />
                </>
            ) : (
                <>
                    {commentData.content}
                    <br />
                    {commentData.author.userId === user.userId && (
                        <CommentButton
                            commentData={commentData}
                            setCommentEdit={setCommentEdit}
                            fetchCommentData={fetchCommentData}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default CommentDetail;
