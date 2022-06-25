import React, { useState } from "react";
import * as Api from "../../api";
import { User, UserImg, UserDate, UserName, EditButton } from "./PostStyle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostAuthor = ({ post, setPostEdit }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.value);
    const [author, setAuthor] = useState(post.author);

    const postDelete = () => {
        if (window.confirm("정말 삭제합니까?")) {
            Api.delete("boards", post.boardId);
            alert("삭제되었습니다.");
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
            {user.userId === author.userId && (
                <>
                    <EditButton
                        sx={{
                            color: "#FAC213",
                        }}
                        onClick={() => setPostEdit(true)}
                    >
                        수정
                    </EditButton>
                    <EditButton
                        sx={{
                            color: "#F77E21",
                        }}
                        onClick={() => postDelete()}
                    >
                        삭제
                    </EditButton>
                </>
            )}
        </User>
    );
};
export default PostAuthor;
