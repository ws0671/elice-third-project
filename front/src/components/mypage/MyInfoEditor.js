import { useState } from "react";

import axios from "axios";

import { Button, TextField, Input, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddIcon from "@mui/icons-material/Add";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  UserImgWrapper,
  UserImg,
  UserName,
  Info,
  InfoTitle,
  InfoContent,
  Species,
} from "./styledCP";

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
    setMyInfo((current) => {
      return { ...current, imageUrl: imageUrl };
    });
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
      await Api.put(`users/${user.userId}`, {
        name: myInfo.name,
        description: myInfo.description,
        speciesArray: myInfo.speciesArray,
        imageUrl: imageUrl ? imageUrl : myInfo.imageUrl,
      });
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
    <>
      <UserImgWrapper>
        {previewImg.src ? (
          <UserImg src={previewImg.src} alt="프로필 사진 미리보기" />
        ) : (
          <UserImg src={myInfo.imageUrl} alt="프로필 사진" />
        )}
      </UserImgWrapper>
      <UserName>
        <TextField
          size="small"
          value={myInfo.name}
          name="name"
          onChange={handleChange}
        />
      </UserName>
      <label htmlFor="icon-button-file">
        <Input
          sx={{ display: "none" }}
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={(e) => {
            fileToDataURL(e.target.files[0]);
          }}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <Info>
        <InfoTitle>이메일</InfoTitle>
        <InfoContent>{myInfo.email}</InfoContent>
      </Info>
      <Info>
        <InfoTitle>소개</InfoTitle>
        <TextField
          fullWidth
          size="small"
          value={myInfo.description}
          name="description"
          onChange={handleChange}
        />
      </Info>
      <Info>
        <InfoTitle>반려동물</InfoTitle>
        {myInfo.speciesArray?.map((item, index) => {
          return (
            <Species key={item}>
              {item}
              <RemoveCircleIcon onClick={() => handleRemoveClick(index)} />
            </Species>
          );
        })}
        {isSpeciesAdding ? (
          <TextField
            onBlur={handleBlur}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleEnter(e.target.value);
              }
            }}
          />
        ) : (
          <AddIcon onClick={handleAddClick} />
        )}
      </Info>
      <Button
        variant="contained"
        size="medium"
        onClick={handleSaveClick}
        startIcon={<ArrowBackIcon />}
      >
        돌아가기
      </Button>
      <Button
        variant="contained"
        size="medium"
        onClick={() => {
          handleSaveClick();
          setIsEditing(false);
        }}
        startIcon={<CheckCircleIcon />}
      >
        저장하기
      </Button>
    </>
  );
};

export default MyInfoEditor;
