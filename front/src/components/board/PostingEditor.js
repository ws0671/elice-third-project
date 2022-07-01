import { Container, Grid, Button, ButtonBase, Input } from "@mui/material";
import {
    TitleInput,
    ContentInput,
    TagInput,
    Tag,
    EditPageTitle,
    Preview,
    PreviewTitle,
    PostImg,
} from "./PostEditorStyle";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Api from "../../api";
import axios from "axios";
import React from "react";
import { DefaultBtn, NegativeBtn } from "../common/Buttons";

const PostingEditor = ({ post, setPostEdit, fetchData }) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [image, setImage] = useState(post.imageUrl);
    const [hashTag, setHashTag] = useState("");
    const [hashTagArray, setHashTagArray] = useState(post.hashTagArray);
    const [previewImg, setPreviewImg] = useState({
        src: "",
        name: "",
    });

    // 이미지를 다시 파일로
    const dataURLToFile = (dataURL, fileName) => {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, { type: mime });
    };

    // 이미지 미리보기
    const fileToDataURL = (file) => {
        setImage("");
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve) => {
            reader.onload = () => {
                setPreviewImg(() => {
                    return { src: reader.result, name: file.name };
                });
                resolve();
            };
        });
    };

    const onKeyPress = (e) => {
        console.log(hashTagArray);
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
        const file = dataURLToFile(previewImg.src, previewImg.name);
        const formData = new FormData();
        formData.append("image", file);
        const res = await axios.post(
            `http://${window.location.hostname}:5000/boards/images`,
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
            if (previewImg.src) {
                console.log("프리뷰있을때", previewImg);
                await onUploadImg().then((imageUrl) => {
                    updatePost(imageUrl);
                });
            } else {
                updatePost();
                console.log("프리뷰없을때");
            }

            alert("게시글 수정을 성공하였습니다.");
        } catch (error) {
            alert("게시글 수정에 실패하였습니다.", error);
            console.log(error);
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
                    minHeight: "45px",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    overflow: "hidden",
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
                    <label htmlFor="ex_file">
                        <Input
                            type="file"
                            accept="image/*"
                            placeholder="이미지 첨부"
                            id="ex_file"
                            style={{ display: "none" }}
                            onChange={(e) => fileToDataURL(e.target.files[0])}
                        />
                        <DefaultBtn component="span">
                            <div className="btnText">이미지 업로드</div>
                        </DefaultBtn>
                    </label>
                </Grid>
                <Grid>
                    <DefaultBtn onClick={stopEvent}>
                        <div className="btnText">수정 완료</div>
                    </DefaultBtn>
                    {"  "}
                    <NegativeBtn
                        sx={{
                            background: "#FE6C63",
                        }}
                        onClick={() => navigate("/board")}
                    >
                        <div className="btnText">취소</div>
                    </NegativeBtn>
                </Grid>
            </Grid>
            {!image && previewImg?.src && (
                <>
                    <PreviewTitle>
                        이미지 미리보기
                        <NegativeBtn
                            style={{ margin: "5px" }}
                            onClick={() => {
                                setPreviewImg({ src: "", name: "" });
                            }}
                        >
                            사진 취소
                        </NegativeBtn>
                    </PreviewTitle>
                    <Preview>
                        <PostImg
                            style={{
                                backgroundImage: `url(${previewImg.src})`,
                            }}
                        />
                    </Preview>
                </>
            )}

            {image && (
                <>
                    <PreviewTitle>
                        이미지 미리보기
                        <NegativeBtn
                            style={{ margin: "5px" }}
                            onClick={() => {
                                setImage("");
                            }}
                        >
                            사진 취소
                        </NegativeBtn>
                    </PreviewTitle>
                    <Preview>
                        <PostImg
                            style={{
                                backgroundImage: `url(${image})`,
                            }}
                        />
                    </Preview>
                </>
            )}
        </Container>
    );
};

export default PostingEditor;
