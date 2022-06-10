import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../store/slices/authSlice";

import {
  Typography,
  Grid,
  Box,
  TextField,
  Link,
  Button,
  Container,
  FormControlLabel,
  Checkbox,
  CssBaseline,
} from "@mui/material";

import * as Api from "../api";

import Header from "../components/common/Header";
import AuthLogo from "../components/Auth/AuthLogo";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["rememberEmail"]);

  const formRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formRef.current.reportValidity()) {
      if (isRemember) {
        setCookie("rememberEmail", email);
      } else {
        removeCookie("rememberEmail");
      }

      try {
        const res = await Api.post("users/login", {
          email: email,
          password: password,
        });

        // 유저 정보는 response의 data임.
        const user = res.data;
        // JWT 토큰은 유저 정보의 token임.
        const jwtToken = user.token;
        // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
        sessionStorage.setItem("userToken", jwtToken);
        // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
        dispatch(LOGIN_SUCCESS(user));

        // 메인 화면으로 돌아감. (뒤로가기 불가능)
        navigate("/", { replace: true });
      } catch (err) {
        console.log(err);
        alert("로그인에 실패하였습니다.", err);
      }
    }
  };

  useEffect(() => {
    if (cookies.rememberEmail !== undefined) {
      setEmail(cookies.rememberEmail);
      setIsRemember(true);
    }
  }, [cookies.rememberEmail]);

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AuthLogo />
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            ref={formRef}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={isRemember}
                  checked={isRemember}
                  color="primary"
                  onChange={() => {
                    setIsRemember(!isRemember);
                  }}
                />
              }
              label="이메일 기억하기"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  onClick={() => {
                    navigate("../register");
                  }}
                >
                  {"아직 계정이 없다면? 회원가입"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
