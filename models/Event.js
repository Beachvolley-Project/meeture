©const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
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
    participants: {
      type: Schema.Types.ObjectId,
      ref: "User",
      numberOf: {
        type: Number,
        min: 4,
        max: 10,
      },
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Places",
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
