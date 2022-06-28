import { Schema, model } from "mongoose";

const DogsSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    nameEng: {
      type: String,
      required: true,
    },
    nameKor: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    feature: {
      type: String,
      required: true,
    },
    personality: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DogsModel = model("Dogs", DogsSchema);

export { DogsModel };
