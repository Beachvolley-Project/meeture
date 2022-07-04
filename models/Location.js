const { Schema, model } = require("mongoose");

const locationSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    prices: {
      type: Number
    },
    numberOfCourts: {
      type: Number,
      required: true
    },
    openingHours: {
      type: String,
      required: true
    },
    website: {
      type: String,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Location = model("Location", locationSchema);

module.exports = Location;
