import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userController } from "../controllers/userController";

const userAuthRouter = Router();

// 회원가입
userAuthRouter.post("/users/register", userController.register);

// 로그인
userAuthRouter.post("/users/login", userController.login);

// 모든 회원 리스트
userAuthRouter.get("/users", login_required, userController.getUsers);

userAuthRouter.get(
  "/users/current",
  login_required,
  userController.getCurrentUserInfo
);

userAuthRouter.put(
  "/users/:userId",
  login_required,
  userController.setUserInfo
);

userAuthRouter.get(
  "/users/:userId",
  login_required,
  userController.getUserInfo
);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, userController.afterLogin);

export { userAuthRouter };
