import { Container, Grid, Button, FormControl } from "@mui/material";
import { PageTitle, TitleWrite, Write, TagInput, Tag } from "./PostEditorStyle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Api from "../../api";

const PostingEditor = ({ post, setPost, setPostEdit, postEdit }) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [image, setImage] = useState(post.imageUrl);
    const [hashTag, setHashTag] = useState("");
    const [hashTagArray, setHashTagArray] = useState(post.hashTagArray);
    const onKeyPress = (e) => {
        if (e.target.value.length !== 0 && e.key === "Enter") {
            let updatedTagList = [...hashTagArray];
            updatedTagList.push(hashTag);
            setHashTagArray(updatedTagList);
            setHashTag("");
        }
    };

    const deleteTagItem = (e) => {
        const deleteTagItem = e.target.parentElement.firstChild.textContent;
        const filteredTagList = hashTagArray.filter(
            (tagItem) => tagItem !== deleteTagItem
        );
        setHashTagArray(filteredTagList);
    };

    const onUploadImg = (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        const res = Api.post("boards/images", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        setImage(res.data);
    };

    const handleSubmit = async () => {
        try {
            await Api.put(`boards/${post.boardId}`, {
                title,
                content,
                imageUrl: image,
                hashTagArray,
            });
            alert("게시글 수정을 성공하였습니다.");
            window.location.replace(`/post/${post.boardId}`);
        } catch (error) {
            alert("게시글 수정에 실패하였습니다.", error);
        }
    };
    const stopEvent = (e) => {
        if ((title.length > 0) & (content.length > 0)) {
            e.preventDefault();
            setPostEdit(false);
            handleSubmit();
        } else {
            alert("제목과 내용을 입력하세요.");
        }
    };

    return (
        <>
            <Container maxWidth="lg">
                <PageTitle>게시글 수정</PageTitle>
                <TitleWrite
                    required
                    maxRows={1}
                    placeholder="제목을 입력하세요"
                    value={title}
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Write
                    required
                    minRows={15}
                    maxRows={15}
                    placeholder="내용을 입력하세요"
                    value={content}
                    name="content"
                    onChange={(e) => setContent(e.target.value)}
                />

                <TagInput
                    maxRows={1}
                    value={hashTag}
                    placeholder="엔터로 해시태그를 등록해주세요."
                    onChange={(e) => setHashTag(e.target.value)}
                    onKeyPress={onKeyPress}
                />
                <Grid
                    style={{
                        color: "gray",
                        padding: "1%",
                        display: "flex",
                    }}
                >
                    {hashTagArray?.map((tagItem, idx) => (
                        <Tag key={idx}>
                            {tagItem}
                            <Button
                                style={{
                                    maxWidth: "30px",
                                    maxHeight: "20px",
                                    minWidth: "30px",
                                    minHeight: "20px",
                                }}
                                onClick={deleteTagItem}
                            >
                                X
                            </Button>
                        </Tag>
                    ))}
                </Grid>
                <Grid
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "1% 0",
                    }}
                >
                    <Grid>
                        <TagInput
                            type="file"
                            placeholder="이미지 첨부"
                            //onChange={onUploadImg}
                        />
                    </Grid>
                    <Grid>
                        <Button
                            sx={{
                                color: "#187498",
                                border: "solid 1px #187498",
                            }}
                            onClick={stopEvent}
                        >
                            수정 완료
                        </Button>
                        {"  "}
                        <Button
                            sx={{
                                color: "#FF4949",
                                border: "solid 1px #FF4949",
                            }}
                            onClick={() => navigate("/board")}
                        >
                            취소
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default PostingEditor;
