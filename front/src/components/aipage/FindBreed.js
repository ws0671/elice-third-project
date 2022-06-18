import {useState} from "react";

import styled from "styled-components";
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';

import * as mobilenet from '@tensorflow-models/mobilenet'; 
//const mobilenet = require('@tensorflow-models/mobilenet');


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
const myModel = require('./models/model.json');



const FindBreed = () => {
    const [isClassified, setIsClassified] = useState(false);
    // const [isModelLoaded, setIsModelLoaded] = useState(false);
    // const [model, setModel] = useState(null);
    // const [imgSrc, setImgSrc] = useState(imgDefault);

    // 프로필 이미지 미리보기
    const [previewImg, setPreviewImg] = useState({
        src: "",
        name: "",
    });

    const [result, setResult] = useState({
        breed: "",
        prob: "",
    });

    // const dogImgUrl = 'https://media.healthday.com/Images/icimages/pug25.jpg';
    // const dogImgUrl = 'pug25.jpg';
    // const modelPath = 'models/model.json'


    /*
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';

const MODEL_URL = 'model_directory/model.json';

const model = await loadGraphModel(MODEL_URL);
const cat = document.getElementById('cat');
model.execute(tf.browser.fromPixels(cat));
    */
    const modelLoadTest = async () => {
      // try {
      const realModel = await loadGraphModel('models/model.json');  
      // } catch(e) {
        // console.error(e);
      // }
      // const realModel = await loadGraphModel('models/model.json');
      console.log('load success?')

      const im = new Image();
        
      if (previewImg.src == "") {

      }
      im.src = (previewImg.src !== "") ? previewImg.src: imgDefault;
      im.crossOrigin = "Anonymous";
      im.width =128;
      im.height=128;
      // Load the model.
      // const model = await mobilenet.load();

      // Classify the image.
      // const predictions = await realModel.predict(im);
      // const predictions = realModel.execute(tf.browser.fromPixels(im));
      // const predictions = realModel.predict(im);
      
      const zeros = tf.zeros([1, 128, 128, 3]);
      const predictions= realModel.predict(tf.browser.fromPixels([im]))

      setIsClassified(true);
      const newResult = {};
      newResult.breed = predictions[0].className;
      newResult.prob = '' + (predictions[0].probability * 100.0).toFixed(2) + '%';
      setResult(newResult);
      
      console.log('Predictions with REALMODEL: ');
      console.log(predictions);

    }
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
        im.width =224;
        im.height=224;
        // Load the model.
        const model = await mobilenet.load();

        // Classify the image.
        const predictions = await model.classify(im);
        setIsClassified(true);
        const newResult = {};
        newResult.breed = predictions[0].className;
        newResult.prob = '' + (predictions[0].probability * 100.0).toFixed(2) + '%';
        setResult(newResult);
        
        console.log('Predictions: ');
        console.log(predictions);
        
        /**
         var img = new Image();
            img.src = "http://other-domain.com/image.jpg";
            img.crossOrigin = "Anonymous";
         */

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
                <Button 
                      variant="contained"
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={modelLoadTest}>모델로딩 테스트</Button>
   
              {isClassified && <ResultMsg />}   
            
            
                    
        </AiContainer>
    )
}


export default FindBreed;