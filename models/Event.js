const { Schema, model } = require("mongoose");
const eventSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Please tell us the title of the event!"],
    },
    date: {
      type: Date,
    },
    time: {
      type: Date,
    },
    capacity: {
      type: Number,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    availableSlots: {
      type: Number,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
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

const Event = model("Event", eventSchema);

module.exports = Event;
