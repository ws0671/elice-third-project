import { Schema, model } from "mongoose";
//
const UserMbtiSchema = new Schema({
  userMbti: {
    type: String,
    required: true,
  },
  bestMbti: {
    type: [String],
    required: true,
  },
  worstMbti: {
    type: [String],
    required: true,
  },
});

const UserMbtiModel = model("UserMbti", UserMbtiSchema);

export { UserMbtiModel };
