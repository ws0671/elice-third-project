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

      const { authorId, title, content } = req.body;

      const newBoard = await boardService.addBoard({
        authorId,
        title,
        content,
      });

      res.status(201).json(newBoard);
    } catch (error) {
      next(error);
    }
  };

  // 게시판 리스트 조회
  static getBoardList = async (req, res, next) => {
    try {
      const boardList = await boardService.findBoardList();
      res.status(200).json(boardList);
    } catch (error) {
      next(error);
    }
  };

  // 게시판 상세 내용 조회
  static getBoardContent = async (req, res, next) => {
    try {
      const itemId = req.params.itemId;
      const boardList = await boardService.findBoard({ itemId });
      res.status(200).json(boardList);
    } catch (error) {
      next(error);
    }
  };

  // 게시판 수정
  static editBoard = async (req, res, next) => {
    try {
      const itemId = req.params.itemId;
      const { title, content } = req.body ?? null;
      const toUpdate = { title, content };

      const updatedBoard = await boardService.updateBoard({
        itemId,
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
      const itemId = req.params.itemId;

      const result = await boardService.deleteBoard({ itemId });

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
