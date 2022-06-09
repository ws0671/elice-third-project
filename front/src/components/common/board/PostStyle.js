import { Grid, Input } from "@mui/material";
import styled from "styled-components";

const Left = styled(Grid)`
    width: 69%;
    border: solid 1px #d9d9d9;
    border-radius: 7px;
    min-height: 600px;
    padding: 1% 3%;
    position: relative;
`;

const Right = styled(Grid)`
    width: 29%;
    border: solid 1px #d9d9d9;
    border-radius: 7px;
    padding: 1% 3%;
    position: relative;
`;
const User = styled(Grid)`
    border-bottom: solid 1px #d9d9d9;
    display: flex;
    justify-content: space-between;
    padding: 0 0 1% 0;
`;

const UserImg = styled(Grid)`
    width: 42px;
    height: 42px;
    border-radius: 100%;
    background-color: gray;
`;
const UserName = styled(Grid)`
    width: 40%;
    color: gray;
    padding: 10px 5px;
    font-size: 17px;
`;

const UserDate = styled(Grid)`
    width: 50%;
    color: gray;
    font-size: 15px;
    text-align: right;
    padding: 10px 0;
`;

const Title = styled(Grid)`
    font-size: 18px;
    color: #464646;
    margin: 3% 3% 0 3%;
`;
const PostImg = styled(Grid)`
    background-color: gray;
    margin: 2% 3%;
`;

const Content = styled(Grid)`
    font-size: 15px;
    color: #464646;
    margin: 2% 0;
    margin: 2% 3%;
`;

const PostTag = styled(Grid)`
    padding: 2% 0;
    top: 90%;
    position: absolute;
`;

const PostInfo = styled(Grid)`
    border-bottom: solid 1px #d9d9d9;
    height: 47px;
    font-size: 14px;
    color: gray;
    margin: 1% 0;
`;

const Comment = styled(Grid)`
    margin: 5% 0;
    font-size: 14px;
`;

const CommentName = styled(Grid)`
    font-size: 14px;
    font-weight: bold;
    color: #505050;
`;

const CommentWrite = styled(Grid)`
    top: 90%;
    position: absolute;
    border-top: solid 1px #d9d9d9;
    width: 80%;
    padding: 3%;
    display: flex;
`;

const CommentInput = styled(Input)`
    width: 100%;
    border: none;

    &:hover {
        border-bottom: none;
    }
`;

export {
    Left,
    Right,
    Title,
    User,
    UserImg,
    UserName,
    UserDate,
    Content,
    PostImg,
    PostTag,
    PostInfo,
    Comment,
    CommentName,
    CommentWrite,
    CommentInput,
};
