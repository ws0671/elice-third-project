import { Grid, Button, InputBase } from "@mui/material";
import * as Api from "../../api";

const CommentButton = ({ commentData, setCommentEdit }) => {
    const handleCommentDelete = () => {
        Api.delete("comments", commentData.commentId);
        window.location.replace(`/post/${commentData.boardId}`);
        alert("삭제하였습니다.");
    };
    return (
        <>
            <Button
                size="small"
                sx={{
                    padding: "0",
                    width: "15px",
                }}
                onClick={(e) => setCommentEdit(true)}
            >
                수정
            </Button>
            <Button
                size="small"
                sx={{
                    padding: "0",
                    color: "Red",
                }}
                onClick={handleCommentDelete}
            >
                삭제
            </Button>
        </>
    );
};

export default CommentButton;
