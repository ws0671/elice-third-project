import { Button, Input, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import defaultImg from "../../assets/images/v878-mind-64.jpg";
import styled from "styled-components";
import { DefaultBtn, NegativeBtn } from "../common/Buttons";
import ShowResult from "./ShowResult";
import axios from "axios";
import * as Api from "../../api";

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

//품종 찾기 레이아웃
const FindBreeds = ({ setFindBreed, type, defaultImg }) => {
    const [data, setData] = useState(null);
    const [result, setResult] = useState(null);
    const [resultImg, setResultImg] = useState("");
    const [previewImg, setPreviewImg] = useState({
        src: "",
        name: "",
    });

    const getDescription = async (PredictResult) => {
        console.log("품종 분석 결과", PredictResult);
        if (type === "강아지") {
            console.log("강아지");
            await Api.getQuery("dogs", {
                params: {
                    id1: PredictResult[0].label,
                    id2: PredictResult[1].label,
                    id3: PredictResult[2].label,
                },
            }).then((res) => setData(res.data));
        } else {
            console.log("cat");
            await Api.getQuery("cats", {
                params: {
                    id1: PredictResult[0].label,
                    id2: PredictResult[1].label,
                    id3: PredictResult[2].label,
                },
            }).then((res) => setData(res.data));
        }
    };

    // 강아지 분석
    const handleOnClickPredictDOG = async () => {
        setResultImg(previewImg);
        const file = dataURLToFile(previewImg.src, previewImg.name);
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
            "http://localhost:8080/predictdog",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        const PredictResult = res.data.predictions;
        setResult(PredictResult);
        return PredictResult;
    };

    const PredictBreed = async () => {
        if (previewImg.src) {
            if (type === "강아지") {
                await handleOnClickPredictDOG().then((PredictResult) => {
                    getDescription(PredictResult);
                });
            } else {
                await handleOnClickPredictCAT().then((PredictResult) => {
                    getDescription(PredictResult);
                });
            }
        } else {
            alert("사진을 넣어주세요!");
        }
    };
    useEffect(() => {
        console.log("data", data);
        console.log("result", result);
        console.log(resultImg);
        setPreviewImg(() => {
            return { src: "", name: "" };
        });
    }, [data]);

    const handleOnClickPredictCAT = async () => {
        setResultImg(previewImg);
        const file = dataURLToFile(previewImg.src, previewImg.name);

        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
            "http://localhost:8080//predictcat",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        const PredictResult = res.data.predictions;
        setResult(PredictResult);
        return PredictResult;
    };

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
                    <ImgGrid>
                        {previewImg.src ? (
                            <PetImage
                                style={{
                                    backgroundImage: `url(${previewImg.src})`,
                                }}
                            />
                        ) : (
                            <PetImage
                                style={{
                                    backgroundImage: `url(${defaultImg})`,
                                }}
                            />
                        )}
                    </ImgGrid>
                    <label htmlFor="ex_file">
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
                    <DefaultBtn sx={{ margin: "7px" }} onClick={PredictBreed}>
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
                    {data ? (
                        <>
                            <Type>{type}</Type>
                            <ResultImgCard
                                style={{
                                    backgroundImage: `url(${resultImg.src})`,
                                }}
                            />
                            <ShowResult
                                labels={[
                                    data[0]?.nameKor,
                                    data[1]?.nameKor,
                                    data[2]?.nameKor,
                                ]}
                                probabilities={[
                                    Math.round(result[0]?.probability * 100),
                                    Math.round(result[1]?.probability * 100),
                                    Math.round(result[2]?.probability * 100),
                                ]}
                            />
                            <KoreaName>{data[0]?.nameKor}</KoreaName>
                            <ContentTitle>영어이름</ContentTitle>
                            <DescriptionFont>
                                {data[0]?.nameEng}
                            </DescriptionFont>
                            <ContentTitle>수명 범위</ContentTitle>
                            <DescriptionFont>{data[0]?.age}</DescriptionFont>
                            <ContentTitle>체중 범위</ContentTitle>
                            <DescriptionFont>{data[0]?.weight}</DescriptionFont>
                            <ContentTitle>특징</ContentTitle>
                            <DescriptionFont>
                                {data[0]?.feature}
                            </DescriptionFont>
                            <ContentTitle>성격</ContentTitle>
                            <DescriptionFont>
                                {data[0]?.personality}
                            </DescriptionFont>
                        </>
                    ) : (
                        <>
                            <BeforeResult>
                                <HowToUse>이용 방법</HowToUse>
                                <HowToUse>
                                    1. 사진업로드를 통해 "{type}"사진을
                                    올려주세요!
                                </HowToUse>
                                <HowToUse>
                                    2. 품종 분석하기 버튼을 누른후 잠시만
                                    기다려주세요!
                                </HowToUse>
                                <HowToUse>
                                    3. 조금만 기다리면 이곳에 결과가 뜰거에요!
                                </HowToUse>
                                <DescriptionFont>
                                    * 정면을 응시한 사진이 좋은결과가 나와요
                                </DescriptionFont>
                            </BeforeResult>
                        </>
                    )}
                </ResultCard>
            </Grid>
        </>
    );
};

const CatBreeds = ({ setCatBreed }) => {
    return (
        <FindBreeds
            type={"고양이"}
            defaultImg={defaultImg}
            setFindBreed={setCatBreed}
        />
    );
};

const DogBreeds = ({ setDogBreed }) => {
    return (
        <FindBreeds
            type={"강아지"}
            defaultImg={defaultImg}
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
    max-height: 320px;
    padding: 10px;
`;

const ImgGrid = styled(Grid)`
    width: 80%;
    aspect-ratio: 1 / 1;
    max-width: 200px;
    margin: 10px;
`;

const PetImage = styled(Grid)`
    border-radius: 100%;
    background-size: cover;
    width: 100%;
    height: 100%;
    max-width: 200px;
    display: table;
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

const ResultImgCard = styled(Grid)`
    width: 80%;
    padding-top: 40%;
    border-radius: 10px;
    margin: 20px auto;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const BeforeResult = styled(Grid)`
    font-size: 20px;
    align-items: center;
    display: grid;
    justify-content: center;
    height: 100%;
`;

const HowToUse = styled(Grid)`
    margin: 4px;
`;
