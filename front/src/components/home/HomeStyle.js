import { Grid, Button } from "@mui/material";
import { Container } from "@mui/system";
import styled from "styled-components";
import MainImg from "../../assets/images/pet.jpg";

//  Main 배너
const MainTopBanner = styled(Grid)`
    width: 100vw;
    height: 49vw;
    background-image: url(${MainImg});
    background-size: cover;
    background-repeat: no-repeat;
`;

const MainSlogan = styled(Container)`
    color: #ffffff;
    text-align: right;
    padding-top: 14%;
    @media screen and (max-width: 1100px) {
        padding-top: 9%;
    }
    @media screen and (max-width: 600px) {
        padding-top: 8%;
    }
`;
const Domain = styled(Grid)`
    font-size: 62px;
    font-weight: bold;
    animationname: grow;
    animationduration: 1s;
    margin: 1px 0;
    @media screen and (max-width: 1100px) {
        font-size: 40px;
    }
    @media screen and (max-width: 600px) {
        font-size: 23px;
    }
`;

const SloganInner = styled(Grid)`
    font-size: 35px;
    @media screen and (max-width: 1100px) {
        font-size: 25px;
    }
    @media screen and (max-width: 600px) {
        font-size: 15px;
    }
`;

const SloganButton = styled(Button)`
    && {
        font-size: 22px;
        color: white;
        margin: 15px 0;
        padding: 5px 30px;
        border-radius: 10px;
        border: solid 1px white;

        @media screen and (max-width: 1100px) {
            padding: 3px 15px;
            font-size: 18px;
        }
        @media screen and (max-width: 600px) {
            font-size: 12px;
            padding: 1px 10px;
            margin: 5px 0;
        }
    }
`;

// Main 배너 끝나고 중간에 introduce
const TitleLineWrap = styled(Grid)`
    background-color: #fdf6f0;
    padding: 6%;
    @media screen and (max-width: 600px) {
        padding: 4%;
    }
`;

const TitleLine = styled(Container)`
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    display: flex;
    @media screen and (max-width: 1100px) {
        font-size: 18px;
    }
    @media screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

const SubDomain = styled(Grid)``;

// 각 서비스 소개 css

const ServiceWrap = styled(Grid)``;

const ServiceContent = styled(Container)`
    && {
        padding: 5% 0;
        display: flex;
    }
`;

const LeftContent = styled(Grid)`
    width: 50%;
    text-align: right;
`;

const LeftContentWrap = styled(Grid)`
    font-size: 23px;
    line-height: 35px;
    position: relative;
    padding-bottom: 35%;
    padding-right: 5%;
    @media screen and (max-width: 1100px) {
        font-size: 19px;
        line-height: 30px;
    }
    @media screen and (max-width: 600px) {
        font-size: 12px;
        line-height: 20px;
    }
`;

const ImageWrap = styled(Grid)`
    width: 50%;
    padding-top: 20%;
    background: linear-gradient(to bottom, #ffffff 50%, #f6f5ef 50%);
`;

const RightContent = styled(Grid)`
    width: 50%;
    line-height: 35px;
`;

const RightContentWrap = styled(Grid)`
    font-size: 23px;
    line-height: 35px;
    padding-bottom: 30%;
    padding-left: 5%;
    position: relative;

    @media screen and (max-width: 1100px) {
        font-size: 19px;
        line-height: 30px;
    }
    @media screen and (max-width: 600px) {
        font-size: 12px;
        line-height: 20px;
    }
`;
const RightContentTitle = styled(Grid)`
    font-size: 29px;
    font-weight: bold;
    color: #386150;
    padding: 10px 0;
    @media screen and (max-width: 1100px) {
        font-size: 25px;
    }
    @media screen and (max-width: 600px) {
        font-size: 20px;
    }
`;

const RightContentButton = styled(Button)`
    && {
        display: block;
        color: #ffffff;
        background-color: #386150;
        border-radius: 10px;
        font-weight: bold;
        position: absolute;
        font-size: 25px;
        padding: 5px 15px;
        bottom: 0;
        transition: all 0.35s;

        &:hover {
            border: solid 2px #386150;
            color: #386150;
        }

        @media screen and (max-width: 1100px) {
            font-size: 20px;
            padding: 3px 12px;
        }
        @media screen and (max-width: 600px) {
            font-size: 12px;
            padding: 2px 10px;
        }
    }
`;
const LeftContentButton = styled(Button)`
    && {
        display: block;
        color: #ffffff;
        background-color: #7bae7f;
        border-radius: 10px;
        font-weight: bold;
        position: absolute;
        font-size: 25px;
        padding: 5px 15px;
        bottom: 0;
        right: 0;
        transition: all 0.35s;
        margin-right: 5%;

        &:hover {
            border: solid 2px #7bae7f;
            color: #7bae7f;
        }
        @media screen and (max-width: 1100px) {
            font-size: 20px;
            padding: 3px 12px;
        }

        @media screen and (max-width: 600px) {
            font-size: 12px;
            padding: 2px 10px;
        }
    }
`;

const LeftContentTitle = styled(Grid)`
    font-size: 29px;
    font-weight: bold;
    color: #7bae7f;
    padding: 10px 0;
    @media screen and (max-width: 1100px) {
        font-size: 25px;
    }
    @media screen and (max-width: 600px) {
        font-size: 20px;
    }
`;

// footer
const Footer = styled(Grid)`
    background-color: #f2f2f2;
    height: 150px;
`;

const ReadyWrap = styled(Grid)`
    border-top: solid 1px #f2f2f2;
    height: 200px;
    padding: 80px;
`;

const ReadyContent = styled(Container)`
    && {
        display: flex;
        justify-content: center;
    }
`;

const ReadySlogan = styled(Grid)`
    font-size: 22px;
    font-weight: bold;
    margin: 0 30px;
`;

const JoinButton = styled(Button)`
    && {
        font-size: 18px;
        padding: 3px 10px;
        border: solid 1px;
        margin: 0 10px;
    }
`;

export {
    MainTopBanner,
    MainSlogan,
    Domain,
    SloganInner,
    ServiceWrap,
    ServiceContent,
    TitleLineWrap,
    TitleLine,
    SloganButton,
    LeftContent,
    RightContent,
    RightContentTitle,
    LeftContentTitle,
    RightContentButton,
    LeftContentButton,
    RightContentWrap,
    LeftContentWrap,
    ImageWrap,
    Footer,
    ReadyWrap,
    ReadyContent,
    ReadySlogan,
    JoinButton,
};
