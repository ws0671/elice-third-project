import { Grid, TextareaAutosize } from "@mui/material";
import styled from "styled-components";

const PageTitle = styled(Grid)`
    font-size: 20px;
    font-weight: bold;
    margin: 3% 0;
`;

const TitleWrite = styled(TextareaAutosize)`
    border-radius: 10px;
    border: solid 1px #dcdcdc;
    font-size:18px;
    width: 99%;
    resize: none;
    padding: 2%;
    &: hover {
      background-color: #F7F7F7;
    }

    &: focus {
      
      background-color: #f7f7f7;
      outline:none;
      },
`;

const Write = styled(TextareaAutosize)`
    font-size: 15px;
    border: solid 1px #dcdcdc;
    border-radius: 10px;
    width: 99%;
    resize: none;
    padding: 2%;
    margin : 1% 0;

    &: hover {
      background-color: #F7F7F7;
      
    }

    &: focus {
      border:solid 1px #D6CCC2;
      background-color: #f7f7f7;
      outline:none;
    },
`;

const TagInput = styled("input")`
    font-size: 15px;
    width: 99%;
    resize: none;
    padding: 2%;
    margin: 1% 0;
    border: solid 1px #dcdcdc;
    border-radius: 10px;

    &: hover {
        background-color: #f7f7f7;
    }
    &: focus {
        background-color: #f7f7f7;
        outline: none;
    }
`;

const Tag = styled(Grid)`
    font-size: 12px;
    padding: 7px 12px;
    margin: 0 5px;

    border: solid 1px #dcdcdc;
    border-radius: 20px;
`;
export { PageTitle, TitleWrite, Write, TagInput, Tag };
