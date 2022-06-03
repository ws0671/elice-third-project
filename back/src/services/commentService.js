import { v4 as uuidv4 } from "uuid";
import { CommentModel } from "../db";

class commentService {
  // comment 생성
  static addComment = async ({ boardId, authorId, content }) => {
    const itemId = uuidv4();
    const newComment = { itemId, boardId, authorId, content };

    const createdNewComment = await CommentModel.create(newComment);

    return createdNewComment;
  };

  // boardId에 해당하는 모든 comment 찾기
  static findCommentList = async ({ boardId }) => {
    const commentList = await CommentModel.find({ boardId });
    return commentList;
  };

  // comment 수정
  static updateComment = async ({ itemId, toUpdate }) => {
    const comment = await CommentModel.findOne({ itemId });

    if (!comment) {
      const errorMessage =
        "해당하는 댓글이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    Object.keys(toUpdate).forEach((key) => {
      if (toUpdate[key] === undefined || toUpdate[key] === null) {
        delete toUpdate[key];
      }
    });

    const updatedComment = await CommentModel.findOneAndUpdate(
      { itemId },
      { $set: toUpdate },
      { returnOriginal: false }
    );

    return updatedComment;
  };

  // comment 삭제
  static deleteComment = async ({ itemId }) => {
    const result = await CommentModel.deleteOne({ itemId });
    const deleteResult = result.deletedCount === 1;

    if (!deleteResult) {
      const errorMessage =
        "해당 itemId를 가진 댓글은 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return deleteResult;
  };
}

export { commentService };
