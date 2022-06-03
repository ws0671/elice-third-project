import { v4 as uuidv4 } from "uuid";
import { CommentModel } from "../db";

class commentService {
  // comment 생성
  static addComment = async ({ authorId, content }) => {
    const itemId = uuidv4();
    const newComment = { itemId, authorId, content };

    const createdNewComment = await CommentModel.create(newComment);

    return createdNewComment;
  };
}

export { commentService };
