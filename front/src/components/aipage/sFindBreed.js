import { useState } from "react";

import styled from "styled-components";

import axios from "axios";

import { Button, Input } from "@mui/material";

import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { UserImg } from "../mypage/styledCP";

const AiContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0px;
  position: relative;
`;

const imgDefault = "pug25.jpg";
const serverUrl = "http://localhost:8080";

const dataURLToFile = (dataURL, fileName) => {
  const arr = dataURL.split(",");
  console.log(arr);
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};

async function post(endpoint, previewImg) {
  const file = dataURLToFile(previewImg.src, previewImg.name);
  const formData = new FormData();
  formData.append("image", file);
  return axios
    .post(serverUrl + endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res)
    .catch((error) => error.response);
}

const FindBreed = () => {
  const [isClassified, setIsClassified] = useState(false);
  const [data, setData] = useState({});

  // 프로필 이미지 미리보기
  const [previewImg, setPreviewImg] = useState({
    src: "",
    name: "",
  });

  const [result, setResult] = useState([]);

  // 결과 값 출력 부분
  // predictions 안에 길이 3의 배열로 저장
  // label : label의 인덱스값
  // probability : 예측 확률
  const ResultMsg = () => {
    let lists = [];
    let i = 0;
    console.log("predictions length: ", data["predictions"].length);

    while (i < data["predictions"].length) {
      lists.push(
        <li key={i}>
          품종 : {data["predictions"][i]["label"]} (
          {(data["predictions"][i]["probability"] * 100).toFixed(3) + "%"})
        </li>
      );
      i++;
    }
    return (
      <>
        <br />
        <h2>분석결과</h2>
        {lists}
      </>
    );
  };

  const handleOnClickPredictDOG = async () => {
    if (previewImg.src == "") {
      return;
    }
    await post("/predictdog", previewImg)
      .then(async (res) => {
        console.log(res);
        setData(res.data);
        const id = res.data.predictions[0].label;
        await axios
          .get(`http://localhost:5000/dogs?dogId=${id}`)
          .then((res) => {
            console.log(res);
          });
      })
      .catch((err) => setData({}));

    console.log("get response");
    console.log(data);

    if (data["success"]) {
      console.log("success");
      setIsClassified(true);
    } else {
      setIsClassified(false);
    }
  };

  const handleOnClickPredictCAT = async () => {
    if (previewImg.src == "") {
      return;
    }

    await post("/predictcat", previewImg)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => setData({}));

    console.log("get response");
    console.log(data);

    if (data["success"]) {
      console.log("success");
      setIsClassified(true);
    } else {
      setIsClassified(false);
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

  return (
    <AiContainer>
      {previewImg.src ? (
        <UserImg src={previewImg.src} alt="프로필 사진 미리보기" />
      ) : (
        <UserImg src={imgDefault} alt="프로필 사진" />
      )}
      <br />
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

        <Button
          variant="contained"
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
          사진 바꾸기
        </Button>
      </label>
      <br />
      <Button
        variant="contained"
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={handleOnClickPredictDOG}
      >
        개 품종 확인하기
      </Button>

      <br />
      <Button
        variant="contained"
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={handleOnClickPredictCAT}
      >
        고양이 품종 확인하기
      </Button>

      {isClassified && <ResultMsg />}
    </AiContainer>
  );
};

export default FindBreed;
