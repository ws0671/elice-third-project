import { Grid, Button } from "@mui/material";
import { Container } from "@mui/system";
import styled from "styled-components";

const ServiceTitle = styled(Grid)`
    font-size: 40px;
    font-weight: bold;
    @media screen and (max-width: 600px) {
        font-size: 23px;
    }
`;

const ServiceContent = styled(Grid)`
    font-size: 30px;
    padding: 10px 0;

    white-space: pre-wrap;
    @media screen and (max-width: 600px) {
        font-size: 15px;
    }
`;

const ServiceButton = styled(Button)`
    && {
        font-size: 20px;
        padding: 5px 20px;
        border-radius: 10px;
        border: solid 2px #c2937e;
        background-color: #c2937e;
        font-weight: bold;
        color: white;

        &: hover {
            background-color: #c2937e;
            color: #ffffff;
            border: solid 2px #ffffff;
        }

        @media screen and (max-width: 600px) {
            font-size: 12px;
            padding: 2px 10px;
        }
    }
`;

export { ServiceTitle, ServiceContent, ServiceButton };
