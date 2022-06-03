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
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const BoardModel = model("Board", BoardSchema);

export { BoardModel };
