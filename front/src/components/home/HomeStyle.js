import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import MainImg from "../../assets/images/pet.jpg";

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

const ServiceWrap = styled(Container)`
    border: solid 1px;
`;

const ServiceContent = styled(Grid)`
    border: solid 1px;
    width: 100%;
    height: 400px;
`;

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

const SubDomain = styled(Grid);

export {
    MainTopBanner,
    MainSlogan,
    Domain,
    SloganInner,
    ServiceWrap,
    ServiceContent,
    TitleLineWrap,
    TitleLine,
};
