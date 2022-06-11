import Newposts from "../components/board/NewPosts";
import BestPosts from "../components/board/BestPosts";
import Header from "../components/common/Header";
import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { StylesProvider } from "@material-ui/core";

const PostMenu = styled(Grid)`
    margin: 10px 0;
    text-align: center;
`;

const SelectMenu = styled(Button)`
    padding: 0px 10px;
    margin: 10px;
    color: #386150;
    font-weight: bold;
    font-family: "GyeonggiTitleM";
    &:hover {
        color: black;
    }
`;

const UnSelectMenu = styled(Button)`
    padding: 0px 10px;
    margin: 10px;
    color: #818479;
    font-weight: bold;
    font-family: "GyeonggiTitleM";
    &:hover {
        color: black;
    }
`;

const BoardPage = () => {
    const [menu, setMenu] = useState(true);

    return (
        <>
            <Header />
            <Container maxWidth="lg" style={{ paddingTop: "65px" }}>
                <PostMenu>
                    <StylesProvider injectFirst>
                        {menu ? (
                            <>
                                <SelectMenu style={{ fontSize: "22px" }}>
                                    New Post
                                </SelectMenu>
                                <span style={{ color: "#D9D9D9" }}>|</span>
                                <UnSelectMenu
                                    style={{ fontSize: "22px" }}
                                    onClick={() => setMenu(false)}
                                >
                                    Best Post
                                </UnSelectMenu>
                            </>
                        ) : (
                            <>
                                <UnSelectMenu
                                    style={{ fontSize: "22px" }}
                                    onClick={() => setMenu(true)}
                                >
                                    New Post
                                </UnSelectMenu>
                                <span style={{ color: "#D9D9D9" }}>|</span>
                                <SelectMenu style={{ fontSize: "22px" }}>
                                    Best Post
                                </SelectMenu>
                            </>
                        )}
                    </StylesProvider>
                </PostMenu>
                {menu ? <Newposts /> : <BestPosts />}
            </Container>
        </>
    );
};

export default BoardPage;
