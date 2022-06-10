import { Grid, Input } from "@mui/material";
import styled from "styled-components";

const Left = styled(Grid)`
    width: 69%;
    border: solid 1px #fdf6f0;
    border-radius: 10px;
    background-color: #fdf6f0;
    min-height: 500px;
`;

const Right = styled(Grid)`
    width: 29%;
    position: relative;
    background-color: #fdf6f0;
    position: sticky;
    top: 105px;
    max-height: 700px;
    overflow: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`;
const User = styled(Grid)`
    background-color: #386150;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
    padding: 2% 3%;
`;

const UserImg = styled(Grid)`
    width: 42px;
    height: 42px;
    border-radius: 100%;
    background-color: gray;
`;
const UserName = styled(Grid)`
    width: 40%;
    color: white;
    font-weight: 600;
    padding: 11px 5px 0 5px;
    font-size: 17px;
    font-family: "NanumSquareRound";
`;

const UserDate = styled(Grid)`
    width: 50%;
    color: white;
    font-size: 15px;
    text-align: right;
    padding: 8px 0 0 0;
    font-family: "NanumSquareRound";
`;

const Title = styled(Grid)`
    font-size: 20px;
    color: #464646;
    margin: 3% 5%;
    font-weight: 600;
    font-family: "NanumSquareRound";
`;
const PostImg = styled(Grid)`
    margin: 2% auto;
    width: 90%;
`;

const Content = styled(Grid)`
    font-size: 15px;
    color: #464646;
    margin: 3% 5%;
    font-family: "NanumSquareRound";
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
    font-family: "NanumSquareRound";
    display: flex;
    justify-content: space-between;
`;

const Comment = styled(Grid)`
    margin: 5%;
    padding: 1% 5%;
    font-size: 14px;
    color: gray;
    font-family: "NanumSquareRound";
`;

const CommentName = styled(Grid)`
    font-size: 14px;
    font-weight: bold;
    padding: 1% 0;
    color: #505050;
    font-family: "NanumSquareRound";
`;

const CommentWrite = styled(Grid)`
    top: 92%;
    position: absolute;
    border-top: solid 1px #d6e5e3;
    width: 100%;
    padding: 4% 10%;
    display: flex;
    justify-content: space-between;
`;

const Tag = styled(Grid)`
    color: black;
    border: solid 1px #d6e5e3;
    border-radius: 20px;
    font-size: 0.6rem;
    margin: 0 7px 0 0;
    padding: 6px 12px;
    background-color: white;
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
