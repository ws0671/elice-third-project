import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../store/slices/authSlice";

import {
  Typography,
  Grid,
  Box,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Input, AuthButton } from "../components/Auth/StyledCP";

import * as Api from "../api";

import Layout from "../components/common/Layout";

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

        if (res.status !== 200) {
          throw new Error(res.data);
        }

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
        alert(err.message);
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
      <Layout maxWidth="sm">
        <Box
          sx={{
            padding: "80px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "2px 2px 10px #d9d9d9",
          }}
        >
          <Typography
            component="h4"
            variant="h4"
            sx={{ fontFamily: "GangwonEdu_OTFBoldA" }}
          >
            로그인
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            ref={formRef}
          >
            <Input
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
              autoComplete="off"
            />
            <Input
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
                  sx={{
                    "&.Mui-checked": {
                      color: "#C2937E",
                    },
                  }}
                />
              }
              label="이메일 기억하기"
            />
            <AuthButton type="submit" fullWidth variant="contained">
              로그인
            </AuthButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  onClick={() => {
                    navigate("../register");
                  }}
                  sx={{
                    color: "#C2937E",
                    textDecoration: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  {"아직 계정이 없다면? 회원가입"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default LoginPage;
