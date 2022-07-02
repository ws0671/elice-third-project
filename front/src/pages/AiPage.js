import { Container, Grid, Box } from "@mui/material";
import styled, { keyframes } from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Camera from "../assets/images/camera.png";
import CatButton from "../assets/images/CATBUTTON.jpg";
import DogButton from "../assets/images/DOGBUTTON.jpg";
import DictButton from "../assets/images/DICTBUTTON.jpg";

import { CatBreeds, DogBreeds } from "../components/aipage/FindBreeds";

import Layout from "../components/common/Layout";

const AiPage = () => {
    const navigate = useNavigate();

    const [CatBreed, setCatBreed] = useState(false);
    const [DogBreed, setDogBreed] = useState(false);

    return (
        <>
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
                        <Wrap maxWidth="sm">
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
                        </Wrap>

                        <Wrap maxWidth="sm">
                            <Grid
                                style={{
                                    display: "grid",
                                    textAlign: "center",
                                }}
                            >
                                <br />
                                <DescriptionFont>
                                    더 많은 품종이
                                    <br />
                                    궁금하시다면
                                </DescriptionFont>
                                <DetailFont>
                                    백과사전에서 살펴보세요!
                                </DetailFont>
                            </Grid>

                            <PetButton
                                component="button"
                                style={{
                                    backgroundImage: `url("${DictButton}")`,
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/dict");
                                }}
                            >
                                백과사전
                            </PetButton>
                        </Wrap>
                    </Grid>
                )}
            </Layout>
        </>
    );
};

export default AiPage;

const CameraImg = styled(Box)`
    && {
        background-image: url(${Camera});
        width: 50px;
        height: 40px;
        background-size: cover;
        background-repeat: no-repeat;
        margin: 10px auto;
        @media screen and (max-width: 600px) {
            width: 40px;
            height: 30px;
        }
    }
`;
const BoldFont = styled(Box)`
    && {
        display: inline;
        font-weight: bold;
        color: #c2937e;
        font-size: 36px;
        @media screen and (max-width: 600px) {
            font-size: 25px;
        }
    }
`;

const DescriptionFont = styled(Box)`
    && {
        display: inline;
        font-size: 36px;
        @media screen and (max-width: 600px) {
            font-size: 25px;
        }
    }
`;

const DetailFont = styled(Box)`
    && {
        font-size: 25px;
        margin: 15px;
        @media screen and (max-width: 600px) {
            font-size: 20px;
            margin: 10px;
        }
    }
`;

const PetButton = styled(Grid)`
    && {
        display: grid;
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
        @media screen and (max-width: 600px) {
            width: 70%;
            padding: 12% 0 48% 0;
            margin: 30px auto;
        }
    }
`;

const Wrap = styled(Grid)`
    display: flex;
    margin: 0 auto;
    margin-bottom: 20px;
    max-width: 600px;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
        display: block;
        margin: 30px 0;
    }
`;
