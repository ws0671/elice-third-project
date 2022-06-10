import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { userController } from "../controllers/userController";

const userAuthRouter = Router();

// 회원가입
userAuthRouter.post("/users/register", userController.register);

// 로그인
userAuthRouter.post("/users/login", userController.login);

// 모든 회원 리스트
userAuthRouter.get("/users", loginRequired, userController.getUsers);

userAuthRouter.get(
  "/users/current",
  loginRequired,
  userController.getCurrentUserInfo
);

userAuthRouter.put("/users/:userId", loginRequired, userController.setUserInfo);

userAuthRouter.get("/users/:userId", loginRequired, userController.getUserInfo);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", loginRequired, userController.afterLogin);

export { userAuthRouter };
