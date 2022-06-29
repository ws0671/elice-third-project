import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Grid, Box, Link } from "@mui/material";
import { Input, AuthButton } from "../components/Auth/StyledCP";

import * as Api from "../api";

import Header from "../components/common/Header";
import Layout from "../components/common/Layout";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    nicknameError: "",
    emailError: "",
    passwordError: "",
    passwordNotSameError: "",
  });

  const formRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formRef.current.reportValidity()) {
      try {
        let isFormDataVaild = true;
        Object.keys(errorMessage).forEach((key) => {
          isFormDataVaild = isFormDataVaild && errorMessage[key] === "";
        });

        if (isFormDataVaild) {
          await Api.post("users/register", {
            name: formData.nickname,
            email: formData.email,
            password: formData.password,
          });
          alert(
            `회원가입 완료! ${formData.nickname}님 회원이 되신 것을 환영합니다.`
          );
          navigate("../login");
        }
      } catch (err) {
        alert("회원가입에 실패하였습니다.", err);
      }
    }
  };

  const handleChange = (e) => {
    setFormData((current) => {
      return { ...current, [e.target.name]: e.target.value };
    });

    removeErrorMessage(e.target.name);
  };

  const removeErrorMessage = (name) => {
    const errorName =
      name === "passwordConfirm" ? "passwordNotSameError" : `${name}Error`;

    setErrorMessage((current) => {
      return {
        ...current,
        [errorName]: "",
      };
    });
  };

  const handleBlur = (e) => {
    const newErrorMessage = validate(e.target.name, e.target.value);

    setErrorMessage((current) => {
      return {
        ...current,
        ...newErrorMessage,
      };
    });
  };

  // 유효성 검사
  const validate = (name, value) => {
    switch (name) {
      case "nickname":
        if (value.length < 2 && value.length > 0) {
          return { nicknameError: "닉네임은 두글자 이상이여야 합니다." };
        }
        break;
      case "email":
        if (
          !value
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) &&
          value.length > 0
        ) {
          return { emailError: "올바른 이메일 형식이 아닙니다." };
        }
        break;
      case "password":
        if (
          !value.match(
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
          ) &&
          value.length > 0
        ) {
          return {
            passwordError:
              "숫자, 영문자, 특수문자를 포함하여 8자리 이상 입력해주세요.",
          };
        }
        break;
      case "passwordConfirm":
        if (value !== formData.password && value.length > 0) {
          return { passwordNotSameError: "비밀번호가 일치하지 않습니다." };
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header />
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
            회원가입
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            ref={formRef}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input
                  required
                  fullWidth
                  id="nickname"
                  label="닉네임"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errorMessage.nicknameError !== ""}
                  helperText={errorMessage.nicknameError}
                  autoFocus
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  required
                  fullWidth
                  id="email"
                  label="이메일 (elice@example.com)"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errorMessage.emailError !== ""}
                  helperText={errorMessage.emailError}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  required
                  fullWidth
                  id="password"
                  label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errorMessage.passwordError !== ""}
                  helperText={errorMessage.passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  required
                  fullWidth
                  id="passwordConfirm"
                  label="비밀번호 확인"
                  name="passwordConfirm"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                    removeErrorMessage(e.target.name);
                  }}
                  onBlur={handleBlur}
                  error={errorMessage.passwordNotSameError !== ""}
                  helperText={errorMessage.passwordNotSameError}
                />
              </Grid>
            </Grid>
            <AuthButton type="submit" fullWidth variant="contained">
              회원가입
            </AuthButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  onClick={() => {
                    navigate("../login");
                  }}
                  sx={{
                    color: "#C2937E",
                    textDecoration: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  이미 계정이 있다면? 로그인
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default RegisterPage;
