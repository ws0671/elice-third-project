import { Grid, Button } from "@mui/material";
import styled from "styled-components";

const Tag = styled(Grid)`
    font-size: 16px;
    border-radius: 8px;
    background-color: #65949e;
    margin: 5px 7px 0 0;
    padding: 6px 10px 2px 10px;
    font-weight: bold;
    color: #ffffff;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100px;
    @media screen and (max-width: 600px) {
        font-size: 12px;
        text-overflow: clip;
        white-space: nowrap;
    }
`;
//요기
const PostList = styled(Grid)`
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 25px;
    display: flex;
    width: 100%;
    overflow: hidden;
    padding: 0 15px;
    cursor: pointer;
    box-shadow: 2px 2px 10px #d9d9d9;
`;
const PostUserImg = styled(Grid)`
    border-radius: 100%;
    width: 60px;
    height: 60px;
    margin: 20px 0 0 0;
    @media screen and (max-width: 600px) {
        margin: 10px 0;
        width: 40px;
        height: 40px;
    }
`;

//요기
const PostUserInfo = styled(Grid)`
    padding: 30px 10px 0 3px;
    margin: 0 15px;
    @media screen and (max-width: 600px) {
        padding: 15px 0 5px 15px;
        border-bottom: solid 1px #d9d9d9;
    }
`;

//요기
const PostInfo = styled(Grid)`
    padding: 25px 0px 0 0;
    @media screen and (max-width: 600px) {
        padding: 20px 10px;
        border-bottom: solid 1px #d9d9d9;
    }
`;

//요기
const PostSubInfo = styled(Grid)`
    padding: 38px 0px;
    display: flex;
    @media screen and (max-width: 700px) {
        padding: 5px 0;
    }
    @media screen and (max-width: 900px) {
        padding: 15px;
    }
`;

const ListName = styled(Grid)`
    font-size: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    @media screen and (max-width: 600px) {
        font-size: 18px;
    }
`;

const ListDate = styled(Grid)`
    font-size: 16px;
    @media screen and (max-width: 600px) {
        font-size: 14px;
    }
`;

const ListTitle = styled(Grid)`
    font-weight: bold;
    font-size: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    @media screen and (max-width: 600px) {
        font-size: 18px;
    }
`;

const Count = styled(Grid)`
    font-size: 20px;
    font-color: black;
    margin: 0 10%;
    padding: 4px 0 0 0;
    width: 50px;
    @media screen and (max-width: 600px) {
        font-size: 18px;
    }
`;

const SortGrid = styled(Grid)`
    display: flex;
    justify-content: center;
    margin: 5px 0;
`;

const SortButton = styled(Grid)`
    && {
        font-size: 20px;
        color: black;
        margin: 0 15px;
        padding: 3px;
        cursor: pointer;
        &:hover {
            font-weight: bold;
        }
        @media screen and (max-width: 600px) {
            font-size: 18px;
        }
    }
`;
export {
    PostList,
    PostUserImg,
    PostUserInfo,
    PostInfo,
    PostSubInfo,
    ListName,
    ListDate,
    ListTitle,
    Tag,
    Count,
    SortGrid,
    SortButton,
};
