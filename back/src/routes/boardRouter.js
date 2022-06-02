import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { boardController } from "../controllers/userController";

const boardRouter = Router();

// 게시판 리스트 조회
boardRouter.get("/boardlist", boardController.getBoardList);

// 게시판 상세 내용 조회
boardRouter.get("/board/:itemId", boardController.getBoardContent);

// 게시판 생성
boardRouter.post("/board/create", login_required, boardController.createBoard);

// 게시판 수정
boardRouter.put("/board/:itemId", login_required, boardController.editBoard);

// 게시판 삭제
boardRouter.delete(
  "/board/:itemId",
  login_required,
  boardController.deleteBoard
);

export { boardRouter };
