const { Schema, model } = require("mongoose");

const placesSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Places = model("Places", placesSchema);

module.exports = Places;
