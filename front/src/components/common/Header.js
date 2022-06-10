import { useNavigate } from "react-router-dom";
import { Grid, Container } from "@mui/material";
import styled from "styled-components";
import Image from "../../assets/images/pet-house.png";
const Menu = styled(Grid)`
    padding: 22px 0;
    font-size: 15px;
    cursor: pointer;
    color: #444444;
    display: flex;
    font-family: "GyeonggiTitleM";
    ::after {
        content: "|";
        padding: 2px 12px;
        color: gray;
        font-size: 10px;
    }
`;

const Logo = styled(Grid)`
    padding: 12px 0;
    cursor: pointer;
`;

const Header = () => {
    const navigate = useNavigate();

    return (
        <>
            <Grid
                style={{
                    width: "100%",
                    backgroundColor: "#F6F5EF",
                    marginBottom: "20px",
                    position: "fixed",
                    zIndex: "100",
                }}
            >
                <Container
                    style={{
                        display: "flex",
                        height: "65px",
                        justifyContent: "space-between",
                    }}
                >
                    <Logo
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <img src={Image} style={{ height: "45px" }} />
                    </Logo>
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
