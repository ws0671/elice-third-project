import { Container, Grid, Box } from "@mui/material";
import styled, { keyframes } from "styled-components";
import React, { useState } from "react";
import Header from "../components/common/Header";
import Camera from "../assets/images/camera.png";
import CatButton from "../assets/images/CATBUTTON.jpg";
import DogButton from "../assets/images/DOGBUTTON.jpg";

import { CatBreeds, DogBreeds } from "../components/aipage/FindBreeds";
import Layout from "../components/common/Layout";

const AiPage = () => {
    const [CatBreed, setCatBreed] = useState(false);
    const [DogBreed, setDogBreed] = useState(false);

    return (
        <>
            <Header />
            <Layout>
                {CatBreed | DogBreed ? (
                    <>
                        {CatBreed && <CatBreeds setCatBreed={setCatBreed} />}
                        {DogBreed && <DogBreeds setDogBreed={setDogBreed} />}
                    </>
                ) : (
                    <Grid>
                        <Grid
                            style={{
                                textAlign: "center",
                            }}
                        >
                            <CameraImg />
                            <BoldFont>반려동물</BoldFont>
                            <DescriptionFont>
                                의 품종이 궁금하신가요?
                            </DescriptionFont>
                            <DetailFont>
                                사진으로 간단하게 알아보세요!
                            </DetailFont>
                        </Grid>
                        <Box
                            maxWidth="sm"
                            style={{
                                display: "flex",
                                margin: "0 auto",
                                justifyContent: "space-between",
                            }}
                        >
                            <PetButton
                                component="button"
                                style={{
                                    backgroundImage: `url("${CatButton}")`,
                                }}
                                onClick={() => setCatBreed(true)}
                            >
                                고양이
                            </PetButton>
                            <PetButton
                                component="button"
                                style={{
                                    backgroundImage: `url("${DogButton}")`,
                                }}
                                onClick={() => setDogBreed(true)}
                            >
                                강아지
                            </PetButton>
                        </Box>
                    </Grid>
                )}
            </Layout>
        </>
    );
};

export default AiPage;

const boxFade = keyframes`
from {
    transform: rotate(-5deg);
  }
  to {
    transform: rotate(10deg);
  }
`;

const CameraImg = styled(Box)`
    && {
        background-image: url(${Camera});
        width: 50px;
        height: 40px;
        background-size: cover;
        background-repeat: no-repeat;
        margin: 10px auto;
    }
`;
const BoldFont = styled(Box)`
    && {
        display: inline;
        font-weight: bold;
        color: #c2937e;
        font-size: 36px;
    }
`;

const DescriptionFont = styled(Box)`
    && {
        display: inline;
        font-size: 36px;
    }
`;

const DetailFont = styled(Box)`
    && {
        font-size: 25px;
        margin: 15px;
    }
`;

const PetButton = styled(Box)`
    && {
        border-radius: 15px;
        width: 45%;
        padding: 6% 0 34% 0;
        background-size: cover;
        transition: all 0.3s ease;
        font-size: 25px;
        font-weight: bold;
        text-align: center;
        color: white;
        border: none;

        &&: hover {
            box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 1);
            transform: scale(1.05);
        }
    }
`;
