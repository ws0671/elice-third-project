import is from "@sindresorhus/is";
import { commentService } from "../services/commentService";

class commentController {
  // 댓글 생성
  static createComment = async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "요청 내용이 빈 객체입니다. headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      const { authorId, content } = req.body;

      const newComment = await boardService.addComment({
        authorId,
        content,
      });

      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  };

  // 해당 게시글에 포함되어 있는 댓글 조회
  static getCommentList = async (req, res, next) => {};

  // 댓글 수정
  static editComment = async (req, res, next) => {};

  // 댓글 삭제
  static deleteComment = async (req, res, next) => {};
}

export { commentService };
