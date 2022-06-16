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

// 사진 업로드
userAuthRouter.post(
  "/users/images",
  loginRequired,
  uploadImageMulter.single("image"),
  uploadImage
);

// 회원 정보 수정
userAuthRouter.put("/users/:userId", loginRequired, userController.setUserInfo);

// 특정 회원 정보 조회
userAuthRouter.get("/users/:userId", loginRequired, userController.getUserInfo);

export { userAuthRouter };
