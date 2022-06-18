import is from "@sindresorhus/is";
import { commentService } from "../services/commentService";

class commentController {
  // 댓글 생성
  static createComment = async (req, res, next) => {
    try {
      // authorId는 Service에서 author 정보를 찾기 위해 쓰임
      const authorId = req.currentUserId;
      const { boardId, content } = req.body;
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
  static getComments = async (req, res, next) => {
    try {
      const boardId = req.params.boardId;
      const comments = await commentService.findComments({ boardId });

      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  };

  // 댓글 수정
  static editComment = async (req, res, next) => {
    try {
      const commentId = req.params.commentId;
      const { content } = req.body;
      const toUpdate = { content };

      const updatedComment = await commentService.updateComment({
        commentId,
        toUpdate,
      });

      res.status(200).json(updatedComment);
    } catch (error) {
      next(error);
    }
  };

  // 댓글 삭제
  static deleteComment = async (req, res, next) => {
    try {
      const commentId = req.params.commentId;
      const result = await commentService.deleteComment({ commentId });

      res.status(204).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export { commentController };
