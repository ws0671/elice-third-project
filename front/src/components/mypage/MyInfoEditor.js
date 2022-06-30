import { useState } from "react";

import axios from "axios";

import { Grid, TextField, Input, IconButton } from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddIcon from "@mui/icons-material/Add";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  ImgWrapper,
  Img,
  InfoWrapper,
  Email,
  Animals,
  AnimalEdit,
} from "./styledCP";

import { DefaultBtn, NegativeBtn } from "../common/Buttons";

import * as Api from "../../api";

import { useSelector } from "react-redux";

const MyInfoEditor = ({ setIsEditing, myInfo, setMyInfo }) => {
  const user = useSelector((state) => state.auth.value);

  const [isSpeciesAdding, setIsSpeciesAdding] = useState(false);

  // 프로필 이미지 미리보기
  const [previewImg, setPreviewImg] = useState({
    src: "",
    name: "",
  });

  const handleChange = (e) => {
    setMyInfo((current) => {
      return { ...current, [e.target.name]: e.target.value };
    });
  };

  const handleRemoveClick = (index) => {
    let newSpeciesArray = myInfo.speciesArray;
    newSpeciesArray.splice(index, 1);

    setMyInfo((current) => {
      return { ...current, speciesArray: newSpeciesArray };
    });
  };

  const handleAddClick = () => {
    setIsSpeciesAdding(true);
  };

  const handleBlur = () => {
    setIsSpeciesAdding(false);
  };

  const handleEnter = (addedSpecies) => {
    let newSpeciesArray = myInfo.speciesArray;

    if (newSpeciesArray.includes(addedSpecies)) {
      alert("이미 동일한 반려동물이 등록되어있습니다.");
    } else {
      newSpeciesArray.push(addedSpecies);

      setMyInfo((current) => {
        return { ...current, speciesArray: newSpeciesArray };
      });
    }
    setIsSpeciesAdding(false);
  };

  // 구글 스토리지에 업로드
  const imgUpload = async () => {
    const file = dataURLToFile(previewImg.src, previewImg.name);

    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post(
      "http://localhost:5000/users/images",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      }
    );
    const imageUrl = res.data.imageUrl;
    return imageUrl;
  };

  const handleSaveClick = async () => {
    // 사진 변경시
    if (previewImg.src !== "") {
      const imageUrl = await imgUpload();
      updateUser(imageUrl);
    } else {
      updateUser();
    }
  };

  // 유저 정보 수정
  const updateUser = async (imageUrl) => {
    try {
      const res = await Api.put(`users/${user.userId}`, {
        name: myInfo.name,
        description: myInfo.description,
        speciesArray: myInfo.speciesArray,
        imageUrl: imageUrl ? imageUrl : myInfo.imageUrl,
      });
      setMyInfo(res.data);
      setIsEditing(false);
    } catch (err) {
      alert(err);
    }
  };

  // 미리보기에 필요
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

  // 구글 스토리지 업로드에 필요
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

  return (
    <Grid container>
      <Grid item lg={5} md={5} sm={12} xs={12}>
        <ImgWrapper>
          {previewImg.src ? (
            <Img src={previewImg.src} alt="프로필 사진 미리보기" />
          ) : (
            <Img src={myInfo.imageUrl} alt="프로필 사진" />
          )}
          <label
            htmlFor="icon-button-file"
            style={{ position: "absolute", right: "20px", top: "0px" }}
          >
            <Input
              sx={{ display: "none" }}
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={(e) => {
                fileToDataURL(e.target.files[0]);
              }}
            />
            <IconButton aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </ImgWrapper>
      </Grid>
      <Grid item lg={7} md={7} sm={12} xs={12}>
        <InfoWrapper>
          <TextField
            value={myInfo.name}
            name="name"
            onChange={handleChange}
            size="small"
            sx={{ width: "200px" }}
            autoComplete="off"
          />
          <Email>{myInfo.email}</Email>
          <TextField
            fullWidth
            value={myInfo.description}
            name="description"
            onChange={handleChange}
            size="small"
            autoComplete="off"
          />
          <Animals>
            {myInfo.speciesArray?.map((item, index) => {
              return (
                <AnimalEdit key={item}>
                  <span>{item}</span>
                  <RemoveCircleIcon
                    onClick={() => handleRemoveClick(index)}
                    sx={{ ml: "5px" }}
                  />
                </AnimalEdit>
              );
            })}
            {isSpeciesAdding ? (
              <TextField
                size="small"
                onBlur={handleBlur}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleEnter(e.target.value);
                  }
                }}
              />
            ) : (
              <AddIcon onClick={handleAddClick} fontSize="large" />
            )}
          </Animals>
        </InfoWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <NegativeBtn
            onClick={() => {
              setIsEditing(false);
            }}
            startIcon={<ArrowBackIcon />}
          >
            <div className="btnText">돌아가기</div>
          </NegativeBtn>
          <DefaultBtn
            onClick={handleSaveClick}
            startIcon={<CheckCircleIcon />}
            sx={{ ml: "10px" }}
          >
            <div className="btnText">저장하기</div>
          </DefaultBtn>
        </div>
      </Grid>
    </Grid>
  );
};

export default MyInfoEditor;
