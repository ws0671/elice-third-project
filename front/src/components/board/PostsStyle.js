import { Grid, Button } from "@mui/material";
import styled from "styled-components";

const PostMenu = styled(Grid)`
    margin: 10px 0;
    text-align: center;
`;

const SelectMenu = styled(Button)`
    && {
        padding: 0px 10px;
        margin: 10px;
        color: #386150;
        font-weight: bold;
    }
    &:hover {
        color: black;
    }
`;

const UnSelectMenu = styled(Button)`
    && {
        padding: 0px 10px;
        margin: 10px;
        color: #818479;
        font-weight: bold;
    }
    &:hover {
        color: black;
    }
`;
const Tag = styled(Grid)`
    color: #818479;
    font-size: 13px;
    border-radius: 10px;
    background-color: #c9ada1;
    margin: 7px 7px 0 0;
    padding: 4px 10px;
    font-weight: bold;
    color: white;
`;

const PostList = styled(Grid)`
    background-color: #f6f5ef;
    border-radius: 20px;
    height: 100px;
    margin-bottom: 25px;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;
    padding: 0 15px;
    cursor: pointer;
`;
const PostUserImg = styled(Grid)`
    border-radius: 100%;
    width: 60px;
    height: 60px;
    margin: 20px 0;
`;

const PostUserInfo = styled(Grid)`
    width: 25%;
    max-width: 140px;
    height: 70px;
    margin: 20px 0;
    padding: 8px 3px;
`;

const PostInfo = styled(Grid)`
    width: 50%;
    max-width: 600px;
    height: 70px;
    margin: 20px;
    padding: 0.4rem 0;
`;

const PostSubInfo = styled(Grid)`
    width: 15%;
    max-width: 250px;
    height: 70px;
    padding: 35px 0;
    display: flex;
`;

const ListName = styled(Grid)`
    font-size: 16px;
    font-family: "NanumSquareRound";
    padding: 0.3rem 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 80%;
`;

const ListDate = styled(Grid)`
    font-size: 12px;
`;

const ListTitle = styled(Grid)`
    font-weight: bold;
    font-family: "NanumSquareRound";
    font-size: 1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 80%;
`;

const WritePost = styled(Button)`
    && {
        font-size: 14px;
        font-weight: bold;
        color: white;
        border: solid 1px;
        padding: 0;
        margin: 8px 0;

        &:hover {
            background-color: #ffffff;
            color: #386150;
        }
    }
`;

const Count = styled(Grid)`
    font-size: 15px;
    font-color: gray;
    margin: 0 10%;
`;

const SortGrid = styled(Grid)`
    display: flex;
    justify-content: end;
    margin: 5px 0;
`;

const SortButton = styled(Button)`
    && {
        font-size: 12px;
        color: gray;
        margin: 0 5px;
        padding: 3px;

        &:hover {
            font-weight: bold;
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
    WritePost,
    PostMenu,
    SelectMenu,
    UnSelectMenu,
    Tag,
    Count,
    SortGrid,
    SortButton,
};
