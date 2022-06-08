import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { userController } from "../controllers/userController";
import { uploadImageMulter, uploadImage } from "../middlewares/uploadImage";

const userAuthRouter = Router();

// 회원가입
userAuthRouter.post("/users/register", userController.register);

// 로그인
userAuthRouter.post("/users/login", userController.login);

// 모든 회원 리스트 조회
userAuthRouter.get("/users", loginRequired, userController.getUsers);

// 현재 회원 정보 조회
userAuthRouter.get(
  "/users/current",
  loginRequired,
  userController.getCurrentUserInfo
);

// 회원 정보 수정
userAuthRouter.put(
  "/users/:userId",
  // loginRequired,
  uploadImageMulter.single("image"),
  uploadImage,
  userController.setUserInfo
);

// 특정 회원 정보 조회
userAuthRouter.get("/users/:userId", loginRequired, userController.getUserInfo);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", loginRequired, userController.afterLogin);

export { userAuthRouter };
