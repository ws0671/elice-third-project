import is from "@sindresorhus/is";
import { userAuthRouter } from "../routes/userRouter";
import { boardService } from "../services/boardService";
import { userAuthService } from "../services/userService";

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
      const { title, content } = req.body;
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
  static getBoards = async (req, res, next) => {
    try {
      const sort = req.query.sort;
      const boards = await boardService.findBoards(sort);
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
      const { title, content } = req.body ?? null;
      const toUpdate = { title, content };

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
  // 게시판 검색
  static boardSearch = async (req, res, next) => {
    try {
      const { title } = req.query;
      const page = req.query.page || 1; //default 1페이지
      const perPage = req.query.perPage || 10; //default 10페이지
      const sort = req.query.sort;

      const finalPage = await boardService.getFinalPage({ title, perPage });
      const searchList = await boardService.getSearchList({
        title,
        page,
        perPage,
        sort,
      });
      const listPaged = {
        finalPage: finalPage,
        searchList: searchList,
      };
      //board리스트를 응답값으로 반환
      res.status(200).json(listPaged);
    } catch (error) {
      next(error);
    }
  };
}

export { boardController };
