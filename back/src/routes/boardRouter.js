import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { boardController } from "../controllers/boardController";
import { uploadImageMulter, uploadImage } from "../middlewares/uploadImage";

const boardRouter = Router();

// 사진 업로드
boardRouter.post(
  "/boards/images",
  loginRequired,
  uploadImageMulter.single("image"),
  uploadImage
);

// 게시판 생성
boardRouter.post("/boards", loginRequired, boardController.createBoard);

// 게시판 리스트 조회
boardRouter.get("/boards", boardController.getBoards);

// 게시판 검색
boardRouter.get("/boards/search", boardController.boardSearch);
// 게시판 상세 내용 조회
boardRouter.get(
  "/boards/:boardId",
  loginRequired,
  boardController.getBoardContent
);

// 게시판 수정
boardRouter.put("/boards/:boardId", loginRequired, boardController.editBoard);

// 게시판 삭제
boardRouter.delete(
  "/boards/:boardId",
  loginRequired,
  boardController.deleteBoard
);

export { boardRouter };
