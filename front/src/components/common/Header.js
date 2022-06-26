import { useNavigate } from "react-router-dom";
import { Grid, Container } from "@mui/material";
import styled from "styled-components";
import Image from "../../assets/images/logo.png";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../store/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.value);

  return (
    <Wrapper>
      <Container
        sx={{
          display: "flex",
          height: "140px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo
          onClick={() => {
            navigate("/");
          }}
        >
          <LogoImg src={Image} alt="logo" />
          <SvcName>궁금하냥?</SvcName>
        </Logo>
        <Nav>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/map");
            }}
          >
            우리동네 지도
          </a>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/ai");
            }}
          >
            AI 종 분석
          </a>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/board");
            }}
          >
            소통 공간
          </a>
          {!user && (
            <>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register");
                }}
              >
                회원가입
              </a>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                로그인
              </a>
            </>
          )}
          {user && (
            <>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/mypage");
                }}
              >
                마이페이지
              </a>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  // sessionStorage에 저장했던 JWT 토큰 삭제
                  sessionStorage.removeItem("userToken");
                  // dispatch 함수를 이용해 로그아웃함.
                  dispatch(LOGOUT());
                  // 메인 화면으로 돌아감. (뒤로가기 불가능)
                  navigate("/", { replace: true });
                }}
              >
                로그아웃
              </a>
            </>
          )}
        </Nav>
      </Container>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  width: 100%;
  position: fixed;
  zindex: 100;
`;

const Logo = styled(Grid)`
  padding: 0px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 100px;
`;

const SvcName = styled.div`
  margin-left: 10px;
  font-size: 36px;
`;

const Nav = styled.nav`
  a {
    font-size: 25px;
    color: black;
    text-decoration: none;
    cursor: pointer;

    ::after {
      content: "|";
      padding: 0px 20px;
      color: #c2937e;
      font-size: 25px;
    }

    &:last-child {
      ::after {
        content: none;
      }
    }
  }
`;
