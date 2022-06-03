import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { commentController } from "../controllers/commentController";

const commentRouter = Router();

// 댓글 생성 (저장할 때 boardId와 저장하기 때문에 param이 필요 없다고 판단함)
commentRouter.post(
  "/comments",
  login_required,
  commentController.createComment
);

// 해당 게시글에 포함되어 있는 댓글 조회
commentRouter.get("/comments/:boardId", commentController.getComments);

// 댓글 수정
commentRouter.put(
  "/comments/:commentId",
  login_required,
  commentController.editComment
);

// 댓글 삭제
commentRouter.delete(
  "/comments/:commentId",
  login_required,
  commentController.deleteComment
);

export { commentRouter };
