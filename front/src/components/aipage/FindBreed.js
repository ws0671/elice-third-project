import {useState} from "react";

import styled from "styled-components";


import axios from "axios";

import {
  Button,
  Input,
} from "@mui/material";

import PhotoCamera from "@mui/icons-material/PhotoCamera";


import {UserImg} from "../mypage/styledCP";

const AiContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0px;
  position: relative;
`;

const imgDefault = 'pug25.jpg'
const serverUrl = 'http://localhost:8080'

async function post(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);

  return axios
      .post(serverUrl + endpoint, bodyData, {
          headers: {
            // "Content-Type": "application/json",  
            'Content-Type': 'multipart/form-data',  
          },
      })
      .then((res) => res)
      .catch((error) => error.response);
}

const FindBreed = () => {
    const [isClassified, setIsClassified] = useState(false);

    // 프로필 이미지 미리보기
    const [previewImg, setPreviewImg] = useState({
        src: "",
        name: "",
    });

    const [result, setResult] = useState({
        breed: "",
        prob: "",
    });

    const ResultMsg = () => {
        return(
            <>
                <br/>
                <h2>분석결과</h2>
                <h3>품종 : {result.breed} ({result.prob})</h3>
            </>
        )
    }

    const handleOnClickPredict = async () => {
        // const mobilenet = require('@tensorflow-models/mobilenet');
        // const img = document.getElementById('img');
        const im = new Image();
        
        if (previewImg.src == "") {

        }
        im.src = (previewImg.src !== "") ? previewImg.src: imgDefault;
        im.crossOrigin = "Anonymous";
        //이미지 전처리 모델 서버에서 하기때문에 안해도 됨
        //큰 사이즈 이미지 일까봐 사이즈 줄임
        im.width =300;
        im.height=300;
        // Load the model.
        //const model = await mobilenet.load();

        // Classify the image.
        //const predictions = await model.classify(im);

        // const payload = {"image":im};
        const formData = new FormData();
        formData.append('image',im);

        const predictions = await post('/predictdog', formData);
        //response 내부에 success 키가 있음 True / false
        console.log('Predictions: ');
        console.log(predictions);
        
        if (predictions['success']) {
          console.log('success');
        }

        setIsClassified(true);
        const newResult = {};
        newResult.breed = predictions[0].className;
        newResult.prob = '' + (predictions[0].probability * 100.0).toFixed(2) + '%';
        setResult(newResult);
        
        

    }
   

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
        <AiContainer >
             
                {previewImg.src ? (
                <UserImg src={previewImg.src} alt="프로필 사진 미리보기" />
                ) : (
                <UserImg src={imgDefault} alt="프로필 사진" />
                )}
                <br/>
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
                      onClick={handleOnClickPredict}>품종 확인하기</Button>

                <br />
                {/* <Button 
                      variant="contained"
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={modelLoadTest}>모델로딩 테스트</Button> */}
   
              {isClassified && <ResultMsg />}   
            
            
                    
        </AiContainer>
    )
}


export default FindBreed;