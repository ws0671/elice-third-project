import { Grid, Button } from "@mui/material";
import { Container } from "@mui/system";
import styled from "styled-components";
import MainImg from "../../assets/images/pet.jpg";

//  Main 배너
const MainTopBanner = styled(Grid)`
    width: 100vw;
    height: 49vw;
    // max-width: 1800px;
    // max-height: 900px;
    background-image: url(${MainImg});
    background-size: cover;
    background-repeat: no-repeat;
`;

const MainSlogan = styled(Container)`
    color: #ffffff;
    text-align: right;
    padding-top: 14%;
`;
const Domain = styled(Grid)`
    font-size: 62px;
    font-weight: bold;
    animationname: grow;
    animationduration: 1s;
    margin: 1px 0;
`;

const SloganInner = styled(Grid)`
    font-size: 35px;
`;

const SloganButton = styled(Button)`
    && {
        font-size: 22px;
        color: white;
        margin: 15px 0;
        padding: 5px 30px;
        border-radius: 10px;
        border: solid 1px white;
    }
`;

// Main 배너 끝나고 중간에 introduce
const TitleLineWrap = styled(Grid)`
    background-color: #fdf6f0;
    padding: 100px 0;
`;

const TitleLine = styled(Container)`
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    display: flex;
`;

const SubDomain = styled(Grid)``;

// 각 서비스 소개 css

const ServiceWrap = styled(Grid)``;

const ServiceContent = styled(Container)`
    && {
        height: 500px;
        display: flex;
        padding: 0;
    }
`;

const LeftContent = styled(Grid)`
    width: 50%;
    height: 100%;
    text-align: right;
    padding: 90px 80px;
    font-size: 23px;
    line-height: 35px;
`;

const LeftContentWrap = styled(Grid)`
    font-size: 23px;
    line-height: 35px;
    position: relative;
    height: 100%;
`;

const ImageWrap = styled(Grid)`
    width: 50%;
    height: 100%;
    background: linear-gradient(to bottom, #ffffff 60%, #f6f5ef 40%);
`;

const RightContent = styled(Grid)`
    width: 50%;
    height: 100%;
    font-size: 23px;
    padding: 90px 80px;
    line-height: 35px;
`;

const RightContentWrap = styled(Grid)`
    font-size: 23px;
    line-height: 35px;
    height: 100%;
    position: relative;
`;
const RightContentTitle = styled(Grid)`
    font-size: 29px;
    font-weight: bold;
    color: #386150;
    padding: 10px 0;
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

        &:hover {
            border: solid 2px #7bae7f;
            color: #7bae7f;
        }
    }
`;

const LeftContentTitle = styled(Grid)`
    font-size: 29px;
    font-weight: bold;
    color: #7bae7f;
    padding: 10px 0;
`;

// footer
const Footer = styled(Grid)`
    background-color: #f2f2f2;
    height: 200px;
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
