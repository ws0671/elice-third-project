import { Grid, Button, ButtonBase } from "@mui/material";
import styled from "styled-components";

const Left = styled(Grid)`
    border-radius: 10px;
    background-color: #ffffff;
    min-height: 650px;
    padding: 10px 25px;
    box-shadow: 2px 2px 10px #d9d9d9;
`;

const PostMain = styled(Grid)`
    && {
        display: flex;
        min-height: 550px;
        flex-direction: column;
        justify-content: space-between;
        padding: 1% 3%;
        @media screen and (max-width: 600px) {
            max-height: 500px;
            overflow-y: auto;
        }
    }
`;

const Right = styled(Grid)`
    position: relative;
    background-color: #ffffff;
    border-radius: 10px;
    position: sticky;
    top: 105px;
    max-height: 650px;
    padding: 10px 25px;
    box-shadow: 2px 2px 10px #d9d9d9;
`;
const User = styled(Grid)`
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: solid 1px #d9d9d9;
`;

const UserImg = styled(Grid)`
    min-width: 42px;
    min-height: 42px;
    max-width: 42px;
    max-width: 42px;
    border-radius: 100%;
    margin: 0 5px 0 0;
    background-color: gray;
`;
const UserName = styled(Grid)`
    width: 100%;
    font-weight: bold;
    padding: 11px 0 0 0;
    font-size: 20px;
    @media screen and (max-width: 600px) {
        font-size: 16px;
    }
`;

const UserDate = styled(Grid)`
    width: 100%;
    font-size: 20px;
    text-align: right;
    padding: 11px 0 0 0;
    margin: 0 10px;
    @media screen and (max-width: 600px) {
        font-size: 16px;
    }
`;

const Title = styled(Grid)`
    font-size: 25px;
    color: #464646;
    margin: 3%;
    @media screen and (max-width: 600px) {
        font-size: 20px;
        margin: 1%;
    }
`;
const PostImg = styled(Grid)`
    margin: 2% auto;
    width: 90%;
    max-width: 500px;
    max-height: 500px;
    @media screen and (max-width: 600px) {
        margin: 1% auto;
    }
`;

const Content = styled(Grid)`
    font-size: 20px;
    color: #464646;
    margin: 3%;
`;

const PostTag = styled(Grid)`
    padding: 2% 3%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const PostInfo = styled(Grid)`
    border-bottom: solid 1px #d9d9d9;
    font-size: 20px;
    margin: 1% 0;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
`;

const Comment = styled(Grid)`
    margin: 5%;
    font-size: 16px;
    color: gray;
    @media screen and (max-width: 600px) {
        font-size: 14px;
    }
`;

const Comments = styled(Grid)`
    min-height: 500px;
    max-height: 500px;
    overflow: auto;
    &::-webkit-scrollbar {
        border-radius: 10px;
        background: #e6e9e4;
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #65949e;
    }
`;

const CommentName = styled(Grid)`
    font-size: 20px;
    font-weight: bold;
    padding: 1% 0;
    color: #505050;
    @media screen and (max-width: 600px) {
        font-size: 16px;
    }
`;

const CommentWrite = styled(Grid)`
    border-top: solid 1px #d9d9d9;
    width: 100%;
    padding: 15px;
    display: flex;
    justify-content: space-between;
`;

const Tag = styled(Grid)`
&& {
    color: white;
    border-radius: 10px;
    background-color #65949E;
    font-size: 20px;
    font-weight: bold;
    padding: 6px 12px 5px 12px;
    margin : 5px;
    @media screen and (max-width: 600px) {
        font-size: 14px;
        margin : 3px;
        padding: 8px 12px 5px 12px;
    }
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
    Tag,
    PostMain,
    Comments,
};
