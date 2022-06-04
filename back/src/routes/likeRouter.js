import { Router } from "express-router";
import { loginRequired } from "../middlewares/loginRequired";
import { likeController } from "../controllers/likeController";

const likeRouter = Router();

// 좋아요 정보를 담을 json 생성 (회원가입 시 자동 생성)
likeRouter.post("/likes", loginRequired, likeController.createLike);

// 해당 유저의 좋아요 목록 조회 (현재는 게시글 좋아요 기능만 있음)
likeRouter.get("likes", loginRequired, likeController.getLikes);

// 좋아요 상태 수정 (추가 혹은 취소)
likeRouter.put("likes", loginRequired, likeController.editLike);

export { likeRouter };
