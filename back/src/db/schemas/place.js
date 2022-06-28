import { Schema, model } from "mongoose";

const PlaceSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  place_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  x: {
    type: String,
    required: true,
  },
  y: {
    type: String,
    required: true,
  },
  address_name: {
    type: String,
    required: true,
  },
  road_adress_name: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  place_url: {
    type: String,
    required: true,
  },
});

const PlaceModel = model("Place", PlaceSchema);
export { PlaceModel };
