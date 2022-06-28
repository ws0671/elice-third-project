import { Button, Input, Grid } from "@mui/material";
import { useState } from "react";
import CatDefaultImg from "../../assets/images/CATBUTTON.jpg";
import DogDefaultImg from "../../assets/images/DOGBUTTON.jpg";
import styled from "styled-components";
import { DefaultBtn, NegativeBtn } from "../common/Buttons";
import ShowResult from "./ShowResult";


//dummy data
const labels = ['치와와', '진돗개', '요크셔 테리어',];
const probabilities = [67.234, 44.222, 34.11];

//품종 찾기 레이아웃
const FindBreeds = ({ setFindBreed, type, defaultImg }) => {
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
            <DefaultBtn
                onClick={() => setFindBreed(false)}
                style={{
                    float: "right",
                }}
            >
                <div className="btnText">뒤로가기</div>
            </DefaultBtn>
            <Grid container>
                <PhotoCard
                    item
                    lg={3}
                    md={3}
                    sm={11}
                    xs={12}
                    sx={{ margin: "10px auto" }}
                >
                    {previewImg.src ? (
                        <PetImage src={previewImg.src} alt="기본사진" />
                    ) : (
                        <PetImage src={defaultImg} alt="기본사진" />
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
                        <DefaultBtn component="span">
                            <div className="btnText">사진 업로드</div>
                        </DefaultBtn>
                        <br />
                    </label>
                    <DefaultBtn sx={{ margin: "7px" }}>
                        <div className="btnText">품종 분석하기</div>
                    </DefaultBtn>
                </PhotoCard>
                <ResultCard
                    item
                    lg={8}
                    md={8}
                    sm={11}
                    xs={12}
                    sx={{ margin: "10px auto" }}
                >
                    <Type>{type}</Type>
                    <ShowResult labels={labels} probabilities={probabilities} />
                    <KoreaName>품종이름</KoreaName>
                    <ContentTitle>영어이름</ContentTitle>
                    <DescriptionFont>포메라니언</DescriptionFont>
                    <ContentTitle>수명 범위</ContentTitle>
                    <DescriptionFont>12-14년</DescriptionFont>
                    <ContentTitle>체중 범위</ContentTitle>
                    <DescriptionFont>6-9kg</DescriptionFont>
                    <ContentTitle>특징</ContentTitle>
                    <DescriptionFont>이중 털, 직모</DescriptionFont>
                    <ContentTitle>성격</ContentTitle>
                    <DescriptionFont>
                        셰틀랜드 쉽독은 온화하고 다정하며 호감가는 성격으로
                        알려져 있습니다. 또한 장난기가 많고 애정이 많으며, 이
                        모든 특성들은 때문에 셰틀랜드 쉽독은 인기있는 가족
                        반려동물입니다
                    </DescriptionFont>
                </ResultCard>
            </Grid>
        </>
    );
};

const CatBreeds = ({ setCatBreed }) => {
    return (
        <FindBreeds
            type={"고양이"}
            defaultImg={CatDefaultImg}
            setFindBreed={setCatBreed}
        />
    );
};

const DogBreeds = ({ setDogBreed }) => {
    return (
        <FindBreeds
            type={"강아지"}
            defaultImg={DogDefaultImg}
            setFindBreed={setDogBreed}
        />
    );
};

export { CatBreeds, DogBreeds };

// style
const PhotoCard = styled(Grid)`
    background-color: #ffffff;
    border-radius: 10px;
    justify-items: center;
    display: grid;
    padding: 20px;
    box-shadow: 2px 2px 10px #d9d9d9;
    max-height: 400px;
`;

const PetImage = styled.img`
    border-radius: 100%;
    width: 80%;
    margin: 10px;
    max-width: 250px;
`;

const ResultCard = styled(Grid)`
    padding: 30px 40px;
    font-size: 20px;
    border-radius: 10px;
    box-shadow: 2px 2px 10px #d9d9d9;
    background-color: #ffffff;
`;

const Type = styled(Grid)`
    font-size: 25px;
    color: gray;
`;

const KoreaName = styled(Grid)`
    font-size: 36px;
    padding: 10px 0;
    border-bottom: solid 1px #d9d9d9;
    margin: 5px 0 15px 0;
`;

const ContentTitle = styled(Grid)`
    margin: 10px 0;
    font-size: 25px;
`;

const DescriptionFont = styled(Grid)`
    font-size: 20px;
    color: gray;
    margin: 10px;
`;
