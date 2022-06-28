import { Container, Grid, Button, ButtonBase } from "@mui/material";
import {
    TitleInput,
    ContentInput,
    TagInput,
    Tag,
    EditPageTitle,
} from "./PostEditorStyle";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Api from "../../api";
import axios from "axios";
import React from "react";
const PostingEditor = ({ post, setPostEdit, fetchData }) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [image, setImage] = useState(post.imageUrl);
    const [file, setFile] = useState("");
    const [hashTag, setHashTag] = useState("");
    const [hashTagArray, setHashTagArray] = useState(post.hashTagArray);
    const onKeyPress = (e) => {
        if (e.target.value.length !== 0 && e.key === "Enter") {
            setHashTagArray((currentHashTagArray) => [
                ...currentHashTagArray,
                hashTag,
            ]);
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

    const onUploadImg = async () => {
        const formData = new FormData();
        formData.append("image", file);
        const res = await axios.post(
            "http://localhost:5000/boards/images",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "userToken"
                    )}`,
                },
            }
        );
        const imageUrl = res.data.imageUrl;
        setImage(imageUrl);
        return imageUrl;
    };

    const handleSubmit = async () => {
        try {
            if (file) {
                await onUploadImg().then((imageUrl) => {
                    updatePost(imageUrl);
                });
            } else {
                updatePost();
            }

            alert("게시글 수정을 성공하였습니다.");
        } catch (error) {
            alert("게시글 수정에 실패하였습니다.", error);
        }
    };

    const updatePost = async (imageUrl) => {
        try {
            await Api.put(`boards/${post.boardId}`, {
                title,
                content,
                imageUrl: imageUrl ? imageUrl : image,
                hashTagArray,
            }).then(fetchData);
            console.log("이미지", image, imageUrl);
        } catch (err) {
            alert(err);
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
        <Container maxWidth="lg">
            <EditPageTitle>게시글 수정</EditPageTitle>
            <TitleInput
                required
                maxRows={1}
                placeholder="제목을 입력하세요"
                value={title}
                name="title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <ContentInput
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
                    padding: "5px",
                    display: "flex",
                    height: "45px",
                }}
            >
                {hashTagArray?.map((tagItem, idx) => (
                    <Tag key={idx}>
                        {tagItem}

                        <DoNotDisturbOnOutlinedIcon
                            style={{
                                width: "20px",
                                height: "20px",
                                position: "absolute",
                                padding: " 0 3px",
                                top: "7px",
                                cursor: "pointer",
                                borderRadius: "100%",
                            }}
                            onClick={deleteTagItem}
                        />
                    </Tag>
                ))}
            </Grid>
            <Grid
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "20px 0",
                }}
            >
                <Grid>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        placeholder="이미지 첨부"
                        onChange={(e) => setFile(e.target.files[0])}
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
    );
};

export default PostingEditor;
