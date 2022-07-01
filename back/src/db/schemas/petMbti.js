import { Schema, model } from "mongoose";
//
const PetMbtiSchema = new Schema({
  petMbti: {
    type: String,
    required: true,
  },
  petName: {
    type: [String],
    required: true,
  },
});

const PetMbtiModel = model("PetMbti", PetMbtiSchema);

export { PetMbtiModel };
