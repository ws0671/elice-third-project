import { Grid, Input } from "@mui/material";
import styled from "styled-components";

const Left = styled(Grid)`
    width: 69%;
    border: solid 1px #d6e5e3;
    border-radius: 10px;
    min-height: 600px;
    padding: 1% 3%;
    position: relative;
`;

const Right = styled(Grid)`
    width: 29%;
    border: solid 1px #d6e5e3;
    border-radius: 10px;
    padding: 1% 3%;
    position: relative;
`;
const User = styled(Grid)`
    border-bottom: solid 1px #d6e5e3;
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
    margin: 3% 5%;
`;
const PostImg = styled(Grid)`
    background-color: gray;
    margin: 2% 5%;
`;

const Content = styled(Grid)`
    font-size: 15px;
    color: #464646;
    margin: 3% 5%;
`;

const PostTag = styled(Grid)`
    padding: 2% 5%;
    top: 90%;
    position: absolute;
    display: flex;
`;

const PostInfo = styled(Grid)`
    border-bottom: solid 1px #d6e5e3;
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
    border-top: solid 1px #d6e5e3;
    width: 80%;
    padding: 3%;
    display: flex;
`;

const Tag = styled(Grid)`
    color: black;
    border: solid 1px #d6e5e3;
    border-radius: 20px;
    font-size: 0.6rem;
    margin: 0 7px 0 0;
    padding: 6px 12px;
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
    Tag,
};
