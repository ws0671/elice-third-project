import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import MainImg from "../../assets/images/pet.jpg";

const MainTopBanner = styled(Grid)`
    width: 100vw;
    height: 50vw;
    max-width: 1800px;
    max-height: 900px;
    background-image: url(${MainImg});
    background-size: contain;
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

export { MainTopBanner, MainSlogan, Domain, SloganInner, ServiceWrap };
