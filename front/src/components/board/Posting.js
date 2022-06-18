import { Container, Grid, Button } from "@mui/material";
import { PageTitle, TitleWrite, Write, TagInput, Tag } from "./PostEditorStyle";
import { useNavigate } from "react-router-dom";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import { useState } from "react";
import * as Api from "../../api";
import React from "react";
import axios from "axios";

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

    const onUploadImg = async () => {
        const formData = new FormData();
        formData.append("image", file);
        // const res = await axios.post("boards/images", formData, {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        //     },
        // });
        // setImage(res.data);
        console.log(image);
    };

    const handleSubmit = async () => {
        await Api.post("boards", {
            title,
            content,
            imageUrl: image,
            hashTagArray,
        });
        alert("게시글 등록을 성공하였습니다.");
        navigate(`/board`);
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
            <Container maxWidth="lg" style={{ paddingTop: "70px" }}>
                <PageTitle>새 글 작성</PageTitle>
                <TitleWrite
                    required
                    maxRows={1}
                    placeholder="제목을 입력하세요"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Write
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
                        height: "45px",
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
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            placeholder="이미지 첨부"
                            onChange={(e) =>
                                console.log("here", e.target.files)
                            }
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
                            작성 완료
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

export default Posting;
