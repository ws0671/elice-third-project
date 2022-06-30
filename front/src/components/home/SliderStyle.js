import { Grid, Button } from "@mui/material";
import styled from "styled-components";

const ServiceTitle = styled(Grid)`
    font-size: 50px;
    font-weight: bold;

    @media screen and (max-width: 750px) {
        font-size: 20px;
        line-height: 22px;
    }
`;

const ServiceContent = styled(Grid)`
    font-size: 25px;
    padding: 10px 0;
    line-height: 30px;
    white-space: pre-wrap;
    width: 100%;

    @media screen and (max-width: 750px) {
        font-size: 12px;
        line-height: 18px;
        padding: 5px 0;
    }
`;

const Domain = styled(Grid)`
    font-size: 85px;
    font-weight: bold;
    line-height: 85px;
    margin: 10px;
    border-bottom: solid 5px white;

    @media screen and (max-width: 750px) {
        font-size: 40px;
        line-height: 40px;
        border-bottom: solid 2px white;
        margin: 5px;
    }
`;

const SubDomain = styled(Grid)`
    font-size: 30px;
    font-weight: bold;

    @media screen and (max-width: 750px) {
        font-size: 15px;
    }
`;
const ServiceButton = styled(Button)`
    && {
        font-size: 15px;
        padding: 4px 15px;
        border-radius: 2px;
        border: solid 2px #ffffff;
        font-weight: bold;
        color: white;

        &: hover {
            background-color: #ffffff;
            color: gray;
            border: solid 2px #ffffff;
        }

        @media screen and (max-width: 750px) {
            font-size: 10px;
            padding: 1px 5px;
        }
    }
`;

export { ServiceTitle, ServiceContent, ServiceButton, Domain, SubDomain };
