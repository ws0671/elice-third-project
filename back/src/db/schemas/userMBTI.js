import { Schema, model } from "mongoose";

const UserMBTISchema = new Schema({
  userMBTI: {
    type: String,
    required: true,
  },
  bestMBTI: {
    type: String,
    required: true,
  },
  worstMBTI: {
    type: String,
    required: true,
  },
});

const UserMBTIModel = model("UserMBTI", UserMBTISchema);

export { UserMBTIModel };
