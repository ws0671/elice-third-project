import { Schema, model } from "mongoose";

const LikeSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  boardIdArray: {
    type: [String],
  },
  placeArray: {
    type: Schema.Types.Mixed,
  },
});

const LikeModel = model("Like", LikeSchema);

export { LikeModel };
