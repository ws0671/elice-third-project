import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    itemId: {
      type: String,
      required: true,
    },
    boardId: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
