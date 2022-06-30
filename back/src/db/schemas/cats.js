import { Schema, model } from "mongoose";

const CatsSchema = new Schema(
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

const CatsModel = model("Cats", CatsSchema);

export { CatsModel };
