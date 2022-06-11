import { useNavigate } from "react-router-dom";
import { Grid, Container } from "@mui/material";
import styled from "styled-components";
import Image from "../../assets/images/pet-house.png";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../store/slices/authSlice";

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
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.value);

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
                        <img
                            src={Image}
                            style={{ height: "45px" }}
                            alt="logo"
                        />
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
                        {!user && (
                            <>
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
                            </>
                        )}
                        {user && (
                            <>
                                <div
                                    onClick={() => {
                                        navigate("/mypage");
                                    }}
                                >
                                    마이 페이지
                                </div>
                                <div
                                    onClick={() => {
                                        // sessionStorage에 저장했던 JWT 토큰 삭제
                                        sessionStorage.removeItem("userToken");
                                        // dispatch 함수를 이용해 로그아웃함.
                                        dispatch(LOGOUT());
                                        // 메인 화면으로 돌아감. (뒤로가기 불가능)
                                        navigate("/", { replace: true });
                                    }}
                                >
                                    로그아웃
                                </div>
                                <h3>{user.name}님 로그인 상태</h3>
                            </>
                        )}
                    </Grid>
                </Container>
            </Grid>
        </>
    );
};

export default Header;
