import { Grid, Button, Typography } from "@mui/material";
import styled from "styled-components";

const Tag = styled(Grid)`
    color: #818479;
    font-size: 16px;
    border-radius: 10px;
    background-color: #65949e;
    margin: 5px 7px 0 0;
    padding: 6px 10px 2px 10px;
    font-weight: bold;
    color: white;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100px;
`;

const PostList = styled(Grid)`
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 25px;
    justify-content: space-between;
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
`;

const PostUserInfo = styled(Grid)`
    width: 25%;
    max-width: 250px;
    padding: 30px 10px 0 3px;
    margin: 0 15px;
`;

const PostInfo = styled(Grid)`
    width: 50%;
    max-width: 600px;
    padding: 25px 0px 0 0;
`;

const PostSubInfo = styled(Grid)`
    width: 15%;
    max-width: 250px;
    padding: 38px 0px;
    display: flex;
`;

const ListName = styled(Grid)`
    font-size: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
`;

const ListDate = styled(Grid)`
    font-size: 16px;
`;

const ListTitle = styled(Grid)`
    font-weight: bold;
    font-size: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
`;

const WritePost = styled(Button)`
    && {
        font-size: 16px;
        font-weight: bold;
        color: white;

        margin: 6px;
        background-color: #c2937e;
        border-radius: 10px;
        box-shadow: 2px 2px 10px #d9d9d9;
        &:hover {
            background-color: #c2937e;
        }
    }
`;

const Count = styled(Grid)`
    font-size: 20px;
    font-color: black;
    margin: 0 10%;
    padding: 4px 0 0 0;
    width: 50px;
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
    Tag,
    Count,
    SortGrid,
    SortButton,
};
