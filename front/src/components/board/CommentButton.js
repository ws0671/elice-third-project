import { ButtonBase } from "@mui/material";
import * as Api from "../../api";

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
            <ButtonBase
                style={{
                    padding: "3px 10px",
                    fontSize: "16px",
                    color: "#ffffff",
                    backgroundColor: "#C2937E",
                    borderRadius: "10px",
                    margin: " 5px",
                }}
                onClick={(e) => setCommentEdit(true)}
            >
                수정
            </ButtonBase>
            <ButtonBase
                sx={{
                    padding: "3px 10px",
                    color: "#ffffff",
                    backgroundColor: "#FE6C63",
                    fontSize: "16px",
                    borderRadius: "10px",
                }}
                onClick={handleCommentDelete}
            >
                삭제
            </ButtonBase>
        </>
    );
};

export default CommentButton;
