import Posts from "../components/board/Posts";
import Header from "../components/common/Header";
import { Container, Grid, Button } from "@mui/material";
import styled from "styled-components";

import Layout from "../components/common/Layout";

const PostMenuName = styled(Grid)`
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    width: 100%;
    margin: 0 auto;
    @media screen and (max-width: 600px) {
        font-size: 25px;
    }
`;

const PostDescription = styled(Grid)`
    font-size: 14px;
    text-align: center;
    margin: 10px;
    @media screen and (max-width: 600px) {
        font-size: 10px;
    }
`;
const PostDetail = styled(Grid)`
    font-size: 16px;
    text-align: center;
    padding: 5px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 20px;
    border-radius: 10px;
    @media screen and (max-width: 600px) {
        font-size: 12px;
        padding: 12px;
    }
`;

const BoardPage = () => {
    return (
        <>
            <Layout>
                <PostDescription>
                    "알아둬야 쓸 수 있는 펫 잡학사전"
                </PostDescription>
                <PostMenuName>알.쓸.펫.잡</PostMenuName>
                <Posts />
            </Layout>
        </>
    );
};

export default BoardPage;
