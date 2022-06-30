import Posts from "../components/board/Posts";
import Header from "../components/common/Header";
import { Container, Grid, Button } from "@mui/material";
import styled from "styled-components";

import Layout from "../components/common/Layout";

const PostMenuName = styled(Grid)`
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    @media screen and (max-width: 600px) {
        font-size: 25px;
    }
`;

const BoardPage = () => {
    return (
        <>
            <Header />
            <Layout>
                <PostMenuName>POST</PostMenuName>
                <Posts />
            </Layout>
        </>
    );
};

export default BoardPage;
