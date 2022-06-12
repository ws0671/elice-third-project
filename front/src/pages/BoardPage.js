import Newposts from "../components/board/NewPosts";
import BestPosts from "../components/board/BestPosts";
import Header from "../components/common/Header";
import { Container, Grid, Button } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";

const PostMenu = styled(Grid)`
    margin: 10px 0;
    text-align: center;
`;

const SelectMenu = styled(Button)`
    padding: 0px 10px;
    margin: 10px;
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
            <Container maxWidth="lg" style={{ paddingTop: "4rem" }}>
                <PostMenu>
                    {menu ? (
                        <>
                            <SelectMenu
                                sx={{
                                    fontSize: "1.5rem",
                                    color: "#386150",
                                    fontWeight: "bold",
                                    fontFamily: "GyeonggiTitleM",
                                }}
                            >
                                New Post
                            </SelectMenu>
                            <span style={{ color: "#D9D9D9" }}>|</span>
                            <UnSelectMenu
                                sx={{
                                    fontSize: "1.5rem",
                                    color: "#818479",
                                    fontWeight: "bold",
                                    fontFamily: "GyeonggiTitleM",
                                }}
                                onClick={() => setMenu(false)}
                            >
                                Best Post
                            </UnSelectMenu>
                        </>
                    ) : (
                        <>
                            <UnSelectMenu
                                sx={{
                                    fontSize: "1.5rem",
                                    color: "#818479",
                                    fontWeight: "bold",
                                    fontFamily: "GyeonggiTitleM",
                                }}
                                onClick={() => setMenu(true)}
                            >
                                New Post
                            </UnSelectMenu>
                            <span style={{ color: "#D9D9D9" }}>|</span>
                            <SelectMenu
                                sx={{
                                    fontSize: "1.5rem",
                                    color: "#386150",
                                    fontWeight: "bold",
                                    fontFamily: "GyeonggiTitleM",
                                }}
                            >
                                Best Post
                            </SelectMenu>
                        </>
                    )}
                </PostMenu>
                {menu ? <Newposts /> : <BestPosts />}
            </Container>
        </>
    );
};

export default BoardPage;
