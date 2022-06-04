import { Schema, model } from "mongoose";

const BoardSchema = new Schema(
  {
    boardId: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    viewCount: {
      type: Number,
      required: true,
      default: 0,
    },
    likeCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const BoardModel = model("Board", BoardSchema);

export { BoardModel };
