import { Grid, TextareaAutosize, ButtonBase } from "@mui/material";
import styled from "styled-components";

const PageTitle = styled(Grid)`
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 10px;
    @media screen and (max-width: 600px) {
        font-size: 25px;
    }
`;

const EditPageTitle = styled(Grid)`
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 10px;
    @media screen and (max-width: 600px) {
        font-size: 25px;
    }
`;

const TitleInput = styled(TextareaAutosize)`
    && {
        border-radius: 10px;
        font-size: 20px;
        width: 96%;
        resize: none;
        border: solid 1px #d9d9d9;
        padding: 2%;
        box-shadow: 2px 2px 10px #d9d9d9;
        &: hover {
            background-color: #ffffff;
        }

        &: focus {
            background-color: #ffffff;
            outline: none;
        }

        ,
    }
`;

const ContentInput = styled(TextareaAutosize)`
    font-size: 20px;
    border: solid 1px #d9d9d9;
    border-radius: 10px;
    width: 96%;
    resize: none;
    padding: 2%;
    box-shadow: 2px 2px 10px #d9d9d9;
    margin: 10px 0;

    &: hover {
        background-color: #ffffff;
    }

    &: focus {
        border: solid 1px #d9d9d9;
        background-color: #ffffff;
        outline: none;
    }
    ,
`;

const TagInput = styled("input")`
    font-size: 20px;
    width: 96%;
    resize: none;
    padding: 2%;
    margin: 10px 0;
    border: solid 1px #d9d9d9;
    border-radius: 10px;
    box-shadow: 2px 2px 10px #d9d9d9;
    &: hover {
        background-color: #ffffff;
    }
    &: focus {
        outline: none;
    }
`;

const Tag = styled(Grid)`
    font-size: 20px;
    padding: 8px 30px 5px 10px;
    margin: 3px 6px;
    border-radius: 10px;
    font-weight: bold;
    color: #ffffff;
    background-color: #65949e;
    position: relative;
    box-shadow: 2px 2px 10px #d9d9d9;
    @media screen and (max-width: 600px) {
        font-size: 15px;
        padding: 10px 30px 5px 10px;
    }
`;

const EditButton = styled(ButtonBase)`
    && {
        padding: 5px 10px;
        font-size: 16px;
        font-weight :bold;
        color : #ffffff;
        margin : 0 5px;
        border-radius : 10px;
        box-shadow :  2px 2px 10px #d9d9d9

`;

const Preview = styled(Grid)`
    margin: 2% auto;
    width: 90%;
    max-width: 500px;
    max-height: 500px;
    @media screen and (max-width: 600px) {
        margin: 1% auto;
    }
`;

const PreviewTitle = styled(Grid)`
    font-size: 25px;
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
    border-bottom: solid 1px #d9d9d9;
    @media screen and (max-width: 600px) {
        font-size: 20px;
        margin: 5px;
    }
`;

export {
    PageTitle,
    TitleInput,
    ContentInput,
    TagInput,
    Tag,
    EditPageTitle,
    EditButton,
    Preview,
    PreviewTitle,
};
