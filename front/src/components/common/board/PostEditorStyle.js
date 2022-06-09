import { Grid, TextareaAutosize } from "@mui/material";
import styled from "styled-components";

const PageTitle = styled(Grid)`
    font-size: 20px;
    font-weight: bold;
    margin: 3% 0;
`;

const TitleWrite = styled(TextareaAutosize)`
    border-radius: 10px 10px 0 0;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: solid 1px #dcdcdc;
    font-size:20px;
    width: 99%;
    resize: none;
    padding: 3%;
    &: hover {
      background-color: #F7F7F7;
    }

    &: focus {
      border-bottom:solid 1px #D6CCC2;
        outline:none;
      },
`;

const Write = styled(TextareaAutosize)`
    font-size: 20px;
    border: solid 1px #dcdcdc;
    border-radius: 10px;
    width: 99%;
    resize: none;
    padding: 3%;

    &: hover {
      background-color: #F7F7F7;
    }

    &: focus {
      border:solid 1px #D6CCC2;
      outline:none;
    },
`;
export { PageTitle, TitleWrite, Write };
