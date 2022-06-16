import React, { useState } from "react";
import * as Api from "../../api";
import { Button } from "@mui/material";
import { User, UserImg, UserDate, UserName } from "./PostStyle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostAuthor = ({ post, setPostEdit }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.value);
    const [author, setAuthor] = useState(post.author);
    console.log(author);

    const postDelete = () => {
        if (window.confirm("정말 삭제합니까?")) {
            alert("삭제되었습니다.");
            Api.delete("boards", post.boardId);
            navigate("/board");
        } else {
            alert("취소합니다.");
        }
    };

    return (
        <User>
            {author?.imageUrl && (
                <UserImg
                    style={{
                        backgroundImage: `url(${author.imageUrl})`,
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                    }}
                />
            )}

            <UserName>{author.name}</UserName>
            <UserDate>{post.createdAt.slice(0, 10)}</UserDate>
            {user.userId == author.userId && (
                <>
                    <Button
                        size="small"
                        sx={{
                            color: "#FAC213",
                            margin: " 0 5px",
                        }}
                        onClick={() => setPostEdit(true)}
                    >
                        수정
                    </Button>
                    <Button
                        size="small"
                        sx={{
                            padding: "0",
                            color: "#F77E21",
                        }}
                        onClick={() => postDelete()}
                    >
                        삭제
                    </Button>
                </>
            )}
        </User>
    );
};
export default PostAuthor;
