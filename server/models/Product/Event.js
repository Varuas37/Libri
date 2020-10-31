const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const EventSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    category: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
      maxlength: 100,
    },
    price: {
      required: true,
      type: Number,
    },
    type: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    startDate: {
      required: true,
      type: Date,
    },
    endDate: {
      required: true,
      type: Date,
    },
    startTime: {
      required: false,
      type: String,
    },
    endTime: {
      required: false,
      type: String,
    },
    onCampus: {
      type: Boolean,
    },
    freeFood: {
      type: Boolean,
    },
    location: {
      required: true,
      type: String,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = Event = mongoose.model("event", EventSchema);
