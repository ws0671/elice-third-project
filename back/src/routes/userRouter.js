import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userController } from "../controllers/userController";

const userAuthRouter = Router();

userAuthRouter.post("/user/register", userController.register);

userAuthRouter.post("/user/login", userController.login);

userAuthRouter.get("/userlist", login_required, userController.getUserList);

userAuthRouter.get(
  "/user/current",
  login_required,
  userController.getCurrentUserInfo
);

userAuthRouter.put("/users/:id", login_required, userController.setUserInfo);

userAuthRouter.get("/users/:id", login_required, userController.getUserInfo);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, userController.afterLogin);

export { userAuthRouter };
