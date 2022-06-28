import { Grid, TextareaAutosize } from "@mui/material";
import styled from "styled-components";

const PageTitle = styled(Grid)`
    font-size: 20px;
    font-weight: bold;
    margin: 30px 0;
`;

const EditPageTitle = styled(Grid)`
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 30px 0;
`;

const TitleInput = styled(TextareaAutosize)`
    border-radius: 10px;
    border: solid 1px #EAE0CC;
    font-size:18px;
    width: 96%;
    resize: none;
    padding: 2%;
    &: hover {
      background-color: #fdf6f0;
    }

    &: focus {
      background-color: #fdf6f0;
      outline:none;
      },
`;

const ContentInput = styled(TextareaAutosize)`
    font-size: 16px;
    border: solid 1px #EAE0CC;
    border-radius: 10px;
    width: 96%;
    resize: none;
    padding: 2%;
    margin : 10px 0;

    &: hover {
      background-color: #fdf6f0;
      
    }

    &: focus {
      border:solid 1px #EAE0CC;
      background-color: #fdf6f0;
      outline:none;
    },
`;

const TagInput = styled("input")`
    font-size: 15px;
    width: 96%;
    resize: none;
    padding: 2%;
    margin: 10px 0;
    border: solid 1px #eae0cc;
    border-radius: 10px;
    &: hover {
        background-color: #fdf6f0;
    }
    &: focus {
        background-color: #fdf6f0;
        outline: none;
    }
`;

const Tag = styled(Grid)`
    font-size: 17px;
    padding: 5px 30px 5px 10px;
    margin: 0 6px 0 0;
    border-radius: 10px;
    font-weight: bold;
    color: white;
    background-color: #c9ada1;
    position: relative;
`;
export { PageTitle, TitleInput, ContentInput, TagInput, Tag, EditPageTitle };
