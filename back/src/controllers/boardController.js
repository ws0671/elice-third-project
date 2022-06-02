import is from "@sindresorhus/is";
import { boardService } from "../services/boardService";

class boardController {
  // 게시판 리스트 조회
  static getBoardList = async (req, res, next) => {};

  // 게시판 상세 내용 조회
  static getBoardContent = async (req, res, next) => {};

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

  // 게시판 수정
  static editBoard = async (req, res, next) => {};

  // 게시판 삭제
  static deleteBoard = async (req, res, next) => {};
}

export { boardController };
