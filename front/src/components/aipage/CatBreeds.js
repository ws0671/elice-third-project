import { Button, Input } from "@mui/material";
import { useState } from "react";
import { UserImg } from "../mypage/styledCP";
import imgDefault from "../../assets/images/CATBUTTON.jpg";

const CatBreeds = ({ setCatBreed }) => {
    const [previewImg, setPreviewImg] = useState({
        src: "",
        name: "",
    });

    const fileToDataURL = (file) => {
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
    return (
        <>
            {previewImg.src ? (
                <UserImg src={previewImg.src} alt="프로필 사진 미리보기" />
            ) : (
                <UserImg src={imgDefault} alt="프로필 사진" />
            )}
            <label for="ex_file">
                <Input
                    sx={{ display: "none" }}
                    accept="image/*"
                    type="file"
                    id="ex_file"
                    onChange={(e) => {
                        fileToDataURL(e.target.files[0]);
                    }}
                />
                <Button variant="contained" color="primary" component="span">
                    사진 바꾸기
                </Button>
            </label>
            <Button
                variant="contained"
                color="primary"
                component="span"
                onClick={() => setCatBreed(false)}
            >
                뒤로가기
            </Button>
        </>
    );
};

export default CatBreeds;
