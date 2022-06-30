import { ButtonBase } from "@mui/material";
import * as Api from "../../api";
import { DefaultBtn, NegativeBtn } from "../common/Buttons";

const CommentButton = ({ commentData, setCommentEdit, fetchCommentData }) => {
    const handleCommentDelete = () => {
        try {
            Api.delete("comments", commentData.commentId).then(() =>
                fetchCommentData()
            );
            alert("삭제하였습니다.");
        } catch (err) {
            alert("삭제를 실패하였습니다.");
        }
    };
    return (
        <>
            <DefaultBtn sx={{ m: "7px" }} onClick={(e) => setCommentEdit(true)}>
                <div className="btnText">수정</div>
            </DefaultBtn>
            <NegativeBtn onClick={handleCommentDelete}>
                <div className="btnText">삭제</div>
            </NegativeBtn>
        </>
    );
};

export default CommentButton;
