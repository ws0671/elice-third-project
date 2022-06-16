import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    commentId: {
      type: String,
      required: true,
    },
    boardId: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
