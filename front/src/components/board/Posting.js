import { Container, Grid, Button, Input } from "@mui/material";
import {
    PageTitle,
    TitleInput,
    ContentInput,
    TagInput,
    Tag,
    EditButton,
} from "./PostEditorStyle";
import { useNavigate } from "react-router-dom";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import { useState } from "react";
import * as Api from "../../api";
import React from "react";
import axios from "axios";
import { DefaultBtn, NegativeBtn } from "../common/Buttons";

const Posting = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [hashTag, setHashTag] = useState("");
    const [hashTagArray, setHashTagArray] = useState([]);
    const [file, setFile] = useState("");

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
        console.log("ㅇㅅㅇ", imageUrl);
        setImage(imageUrl);
        return imageUrl;
    };

    const handleSubmit = async () => {
        if (file) {
            await onUploadImg().then((imageUrl) => {
                updatePost(imageUrl);
            });
        } else {
            updatePost();
        }
    };

    const updatePost = async (imageUrl) => {
        try {
            await Api.post("boards", {
                title,
                content,
                imageUrl: imageUrl ? imageUrl : image,
                hashTagArray,
            });
            console.log("이미지", image, imageUrl);
            alert("게시글 등록을 성공하였습니다.");
            navigate(`/board`);
        } catch (err) {
            alert(err);
        }
    };

    const stopEvent = (e) => {
        if ((title.length > 0) & (content.length > 0)) {
            e.preventDefault();
            handleSubmit();
        } else {
            alert("제목과 내용을 입력하세요.");
        }
    };

    return (
        <>
            <PageTitle>새 글 작성</PageTitle>
            <TitleInput
                required
                maxRows={1}
                placeholder="제목을 입력하세요"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <ContentInput
                required
                minRows={15}
                maxRows={15}
                placeholder="내용을 입력하세요"
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
                }}
            >
                {hashTagArray?.map((tagItem) => (
                    <Tag key={tagItem}>
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
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <DefaultBtn component="span">
                            <div className="btnText">이미지 업로드</div>
                        </DefaultBtn>
                    </label>
                </Grid>
                <Grid>
                    <DefaultBtn
                        style={{
                            marginRight: "10px",
                        }}
                        onClick={stopEvent}
                    >
                        <div className="btnText">작성 완료</div>
                    </DefaultBtn>
                    {"  "}
                    <NegativeBtn onClick={() => navigate("/board")}>
                        <div className="btnText">취소</div>
                    </NegativeBtn>
                </Grid>
            </Grid>
        </>
    );
};

export default Posting;
