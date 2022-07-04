const { Schema, model } = require("mongoose");

const placeSchema = new Schema(
  {
    Name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    Address: {
      type: String,
      trim: true,
      required: true,
    },
    Prices: {
      type: Number
    },
    NumberOfCourts: {
      type: Number,
      required: true
    },
    OpeningHours: {
      type: String,
      required: true
    },
    Website: {
      type: String,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Place = model("Place", placeSchema);

module.exports = Place;
