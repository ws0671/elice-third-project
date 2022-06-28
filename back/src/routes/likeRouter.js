import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { likeController } from "../controllers/likeController";
import { bodyValidator } from "../middlewares/validator";

const likeRouter = Router();

// 좋아요 정보를 담을 json 생성 (회원가입 시 자동 생성)
likeRouter.post(
  "/likes",
  loginRequired,
  bodyValidator,
  likeController.createLikeInfo
);

// 해당 유저가 좋아요한 정보 조회
likeRouter.get("/likes", loginRequired, likeController.getLikeInfo);

// 좋아요 상태 수정 (추가 혹은 취소)
likeRouter.put("/likes", loginRequired, likeController.editLikedInfo);

export { likeRouter };
