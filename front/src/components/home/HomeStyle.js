import { Grid, Button } from "@mui/material";
import { Container } from "@mui/system";
import styled from "styled-components";
import MainImg from "../../assets/images/pet.jpg";

// Main 배너 끝나고 중간에 introduce
const TitleLineWrap = styled(Grid)`
    background-color: #ffffff;
    padding: 6%;
    @media screen and (max-width: 600px) {
        padding: 32px 0;
    }
`;

const TitleLine = styled(Container)`
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    display: flex;
    @media screen and (max-width: 1100px) {
        font-size: 20px;
    }
    @media screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

// 각 서비스 소개 css

const ServiceWrap = styled(Grid)``;

const ServiceContent = styled(Container)`
    && {
        padding: 3% 0;
        display: flex;
        border-bottom: solid 1px white;
    }
`;

const LeftContent = styled(Grid)`
    width: 50%;
    text-align: right;
    aspect-ratio: 3 / 2;
    padding: 5%;
    @media screen and (max-width: 750px) {
        padding: 2%;
    }

    @media screen and (max-width: 600px) {
        aspect-ratio: 2 / 3;
        padding: 4%;
    }
`;

const LeftContentWrap = styled(Grid)`
    font-size: 20px;
    line-height: 30px;
    position: relative;
    aspect-ratio: 3 / 2;
    padding: 5%;
    @media screen and (max-width: 1100px) {
        font-size: 16px;
        line-height: 22px;
    }
    @media screen and (max-width: 600px) {
        font-size: 12px;
        line-height: 18px;
        aspect-ratio: 2 / 3;
    }
`;

const ImageWrap = styled(Grid)`
    width: 50%;
    background-position: center;
    background-size: auto 105%;
    background-repeat: no-repeat;
    @media screen and (max-width: 600px) {
        background-size: auto 80%;
    }
`;

const RightContent = styled(Grid)`
    width: 50%;
    line-height: 35px;
    aspect-ratio: 3 / 2;
    padding: 5%;
    @media screen and (max-width: 750px) {
        padding: 2%;
    }
    @media screen and (max-width: 600px) {
        aspect-ratio: 2 / 3;
        padding: 4%;
    }
`;

const RightContentWrap = styled(Grid)`
    font-size: 20px;
    line-height: 30px;
    aspect-ratio: 3 / 2;
    padding: 5%;
    position: relative;
    @media screen and (max-width: 1100px) {
        font-size: 16px;
        line-height: 22px;
    }
    @media screen and (max-width: 600px) {
        font-size: 12px;
        line-height: 18px;
        aspect-ratio: 2 / 3;
    }
`;
const RightContentTitle = styled(Grid)`
    font-size: 25px;
    font-weight: bold;
    color: #c2937e;
    padding: 10px 0;
    @media screen and (max-width: 1100px) {
        font-size: 20px;
    }
    @media screen and (max-width: 600px) {
        font-size: 16px;
    }
`;

const RightContentButton = styled(Button)`
    && {
        display: block;
        color: #ffffff;
        background-color: #c2937e;
        border-radius: 5px;
        font-weight: bold;
        position: absolute;
        font-size: 20px;
        padding: 5px 15px 1px 15px;
        bottom: 0;
        transition: all 0.35s;
        font-family: GangwonEdu_OTFBoldA;
        border: solid 2px #c2937e;

        &:hover {
            border: solid 2px #c2937e;
            color: #c2937e;
            background-color: #ffffff;
        }

        @media screen and (max-width: 1100px) {
            font-size: 16px;
            padding: 4px 12px 0px 12px;
        }
        @media screen and (max-width: 600px) {
            font-size: 10px;
            padding: 3px 4px 0px 4px;
        }
    }
`;
const LeftContentButton = styled(Button)`
    && {
        display: block;
        color: #ffffff;
        background-color: #5c868f;
        border-radius: 5px;
        font-weight: bold;
        position: absolute;
        font-size: 20px;
        padding: 5px 15px 1px 15px;
        bottom: 0;
        right: 0;
        transition: all 0.35s;
        margin-right: 5%;
        border: solid 2px #5c868f;
        font-family: GangwonEdu_OTFBoldA;

        &:hover {
            border: solid 2px #5c868f;
            color: #5c868f;
            background-color: #ffffff;
        }
        @media screen and (max-width: 1100px) {
            font-size: 16px;
            padding: 4px 12px 0px 12px;
        }

        @media screen and (max-width: 600px) {
            font-size: 10px;
            padding: 3px 4px 0px 4px;
        }
    }
`;

const LeftContentTitle = styled(Grid)`
    font-size: 25px;
    font-weight: bold;
    color: #5c868f;
    padding: 10px 0;
    @media screen and (max-width: 1100px) {
        font-size: 20px;
    }
    @media screen and (max-width: 600px) {
        font-size: 16px;
    }
`;

// fo

export {
    ServiceWrap,
    ServiceContent,
    TitleLineWrap,
    TitleLine,
    LeftContent,
    RightContent,
    RightContentTitle,
    LeftContentTitle,
    RightContentButton,
    LeftContentButton,
    RightContentWrap,
    LeftContentWrap,
    ImageWrap,
};
