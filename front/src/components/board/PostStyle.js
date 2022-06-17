import { Grid } from "@mui/material";
import styled from "styled-components";

const Left = styled(Grid)`
    width: 69%;
    border: solid 1px #fdf6f0;
    border-radius: 10px;
    background-color: #fdf6f0;
    min-height: 600px;
`;

const Right = styled(Grid)`
    width: 29%;
    position: relative;
    background-color: #fdf6f0;
    border-radius: 10px;
    position: sticky;
    top: 105px;
    max-height: 650px;
`;
const User = styled(Grid)`
    background-color: #386150;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
    padding: 2% 3%;
`;

const UserImg = styled(Grid)`
    min-width: 42px;
    min-height: 42px;
    max-width: 42px;
    max-width: 42px;
    border-radius: 100%;
    background-color: gray;
`;
const UserName = styled(Grid)`
    width: 40%;
    color: white;
    font-weight: 600;
    padding: 11px 5px 0 5px;
    font-size: 17px;
`;

const UserDate = styled(Grid)`
    width: 50%;
    color: white;
    font-size: 16px;
    text-align: right;
    padding: 10px 0 0 0;
    margin: 0 10px;
`;

const Title = styled(Grid)`
    font-size: 20px;
    color: #464646;
    margin: 3% 5%;
    font-weight: 600;
`;
const PostImg = styled(Grid)`
    margin: 2% auto;
    width: 90%;
`;

const Content = styled(Grid)`
    font-size: 15px;
    color: #464646;
    margin: 3% 5%;
`;

const PostTag = styled(Grid)`
    padding: 2% 5%;
    display: flex;
`;

const PostInfo = styled(Grid)`
    border-bottom: solid 1px #d6e5e3;
    font-size: 14px;
    color: white;
    margin: 1% 0;
    padding: 5% 3%;
    background-color: #386150;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
`;

const Comment = styled(Grid)`
    margin: 5%;
    padding: 1% 5%;
    font-size: 14px;
    color: gray;
`;

const Comments = styled(Grid)`
    min-height: 500px;
    max-height: 500px;
    overflow: auto;
    &::-webkit-scrollbar {
        border-radius: 10px;
        background: #fad4d4;
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #ef9f9f;
    }
`;

const CommentName = styled(Grid)`
    font-size: 14px;
    font-weight: bold;
    padding: 1% 0;
    color: #505050;
`;

const CommentWrite = styled(Grid)`
    border-top: dashed 1px #a0a083;
    width: 100%;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
`;

const Tag = styled(Grid)`
    color: white;
    border-radius: 20px;
    background-color #C9ADA1;
    font-size: 16px;
    font-weight: bold;
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
    Comments,
};
