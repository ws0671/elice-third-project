import { Schema, model } from "mongoose";

const BoardSchema = new Schema(
  {
    itemId: {
      type: String,
      required: true,
    },
    userId: {
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
    whenDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BoardModel = model("Board", BoardSchema);

export { BoardModel };
