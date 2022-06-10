import { Schema, model } from "mongoose";

const LikeSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  boardIdArray: {
    type: [String],
  },
});

const LikeModel = model("Like", LikeSchema);

export { LikeModel };
