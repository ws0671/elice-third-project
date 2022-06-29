import { Schema, model } from "mongoose";

const PetMBTISchema = new Schema({
  petMBTI: {
    type: String,
    required: true,
  },
  petName: {
    type: [String],
    required: true,
  },
});

const PetMBTIModel = model("PetMBTI", PetMBTISchema);

export { PetMBTIModel };
