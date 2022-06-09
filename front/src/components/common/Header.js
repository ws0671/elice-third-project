import { useNavigate } from "react-router-dom";
import { Grid, Container } from "@mui/material";
import styled from "styled-components";

const Menu = styled(Grid)`
    padding: 22px 15px;
    font-size: 15px;
`;
const Header = () => {
    const navigate = useNavigate();

    return (
        <>
            <Grid style={{ width: "100%", backgroundColor: "#F6F5EF" }}>
                <Container
                    style={{
                        display: "flex",
                        height: "65px",
                        justifyContent: "space-between",
                    }}
                >
                    <Menu
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        로고 + 서비스명 (홈으로)
                    </Menu>
                    <Grid style={{ display: "flex" }}>
                        <Menu
                            onClick={() => {
                                navigate("/walk");
                            }}
                        >
                            산책길
                        </Menu>
                        <Menu
                            onClick={() => {
                                navigate("/hospital");
                            }}
                        >
                            병원
                        </Menu>
                        <Menu
                            onClick={() => {
                                navigate("/board");
                            }}
                        >
                            소통 공간
                        </Menu>
                        <Menu
                            onClick={() => {
                                navigate("/ai");
                            }}
                        >
                            AI 종 분석
                        </Menu>
                        <Menu
                            onClick={() => {
                                navigate("/register");
                            }}
                        >
                            회원가입
                        </Menu>
                        <Menu
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            로그인
                        </Menu>
                    </Grid>
                </Container>
            </Grid>
        </>
    );
};

export default Header;
