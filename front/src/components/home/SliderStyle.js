import { Grid, Button } from "@mui/material";
import { Container } from "@mui/system";
import styled from "styled-components";

const ServiceTitle = styled(Grid)`
    font-size: 50px;
    font-weight: bold;
`;

const ServiceContent = styled(Grid)`
    font-size: 25px;
    padding: 10px 0;
    line-height: 30px;
    white-space: pre-wrap;
`;

const Domain = styled(Grid)`
    font-size: 85px;
    font-weight: bold;
    line-height: 85px;
    margin: 10px;
    border-bottom: solid 5px white;
`;

const SubDomain = styled(Grid)`
    font-size: 30px;
    font-weight: bold;
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
            background-color: black;
            color: #ffffff;
            border: solid 2px #ffffff;
        }
    }
`;

export { ServiceTitle, ServiceContent, ServiceButton, Domain, SubDomain };
