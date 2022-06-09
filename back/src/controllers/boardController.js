import is from "@sindresorhus/is";
import { boardService } from "../services/boardService";

class boardController {
  // 게시판 생성
  static createBoard = async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "요청 내용이 빈 객체입니다. headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      const authorId = req.currentUserId;
      const { title, content, imageUrl, hashTagArray } = req.body;
      const newBoard = await boardService.addBoard({
        authorId,
        title,
        content,
        imageUrl,
        hashTagArray,
      });

      res.status(201).json(newBoard);
    } catch (error) {
      next(error);
    }
  };

  // 게시판 리스트 조회
  static getBoards = async (req, res, next) => {
    try {
      const boards = await boardService.findBoards();
      res.status(200).json(boards);
    } catch (error) {
      next(error);
    }
  };

  // 게시판 상세 내용 조회
  static getBoardContent = async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const boardId = req.params.boardId;
      const board = await boardService.findBoard({ userId, boardId });
      res.status(200).json(board);
    } catch (error) {
      next(error);
    }
  };

  // 게시판 수정
  static editBoard = async (req, res, next) => {
    try {
      const boardId = req.params.boardId;
      const { title, content, imageUrl, hashTagArray } = req.body ?? null;
      const toUpdate = { title, content, imageUrl, hashTagArray };

      const updatedBoard = await boardService.updateBoard({
        boardId,
        toUpdate,
      });

      if (updatedBoard.errorMessage) {
        throw new Error(updatedBoard.errorMessage);
      }

      res.status(200).json(updatedBoard);
    } catch (error) {
      next(error);
    }
  };

  // 게시판 삭제
  static deleteBoard = async (req, res, next) => {
    try {
      const boardId = req.params.boardId;

      const result = await boardService.deleteBoard({ boardId });

      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }

      res.status(204).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export { boardController };
