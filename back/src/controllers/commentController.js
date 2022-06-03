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

      const { boardId, authorId, content } = req.body;

      const newComment = await commentService.addComment({
        boardId,
        authorId,
        content,
      });

      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  };

  // 해당 게시글에 포함되어 있는 댓글 조회
  static getCommentList = async (req, res, next) => {
    try {
      const boardId = req.params.boardId;
      const commentList = await commentService.findCommentList({ boardId });

      res.status(200).json(commentList);
    } catch (error) {
      next(error);
    }
  };

  // 댓글 수정
  static editComment = async (req, res, next) => {
    try {
      const itemId = req.params.itemId;
      const { content } = req.body ?? null;
      const toUpdate = { content };

      const updatedComment = await commentService.updateComment({
        itemId,
        toUpdate,
      });

      if (updatedComment.errorMessage) {
        throw new Error(updatedComment.errorMessage);
      }

      res.status(200).json(updatedComment);
    } catch (error) {
      next(error);
    }
  };

  // 댓글 삭제
  static deleteComment = async (req, res, next) => {
    try {
      const itemId = req.params.itemId;
      const result = await commentService.deleteComment({ itemId });

      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }

      res.status(204).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export { commentController };
