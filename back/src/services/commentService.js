import { v4 as uuidv4 } from "uuid";
import { CommentModel, UserModel } from "../db";

class commentService {
  // comment 생성
  static addComment = async ({ boardId, authorId, content }) => {
    const commentId = uuidv4();
    // authorId를 통해 해당하는 user(author)의 정보를 얻음
    // 댓글의 정보를 받아올 때 populate를 사용하기 위해 해당 user의 _id를 author에 저장
    const author = await UserModel.findOne({ userId: authorId });
    const newComment = { commentId, boardId, author: author._id, content };

    const createdNewComment = await CommentModel.create(newComment);

    return createdNewComment;
  };

  // boardId에 해당하는 모든 comment 찾기
  static findComments = async ({ boardId }) => {
    const comments = await CommentModel.find({ boardId }).populate("author");
    return comments;
  };

  // comment 수정
  static updateComment = async ({ commentId, toUpdate }) => {
    const comment = await CommentModel.findOne({ commentId }).populate(
      "author"
    );

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
      { commentId },
      { $set: toUpdate },
      { returnOriginal: false }
    ).populate("author");

    return updatedComment;
  };

  // comment 삭제
  static deleteComment = async ({ commentId }) => {
    const result = await CommentModel.deleteOne({ commentId });
    const deleteResult = result.deletedCount === 1;

    if (!deleteResult) {
      const errorMessage =
        "해당 commentId를 가진 댓글은 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return deleteResult;
  };
}

export { commentService };
