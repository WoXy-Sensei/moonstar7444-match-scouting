import { Schema, model } from "mongoose";

const RobotSchema = new Schema({
  competition: {
    type: String,
    required: true,
    default: true,
  },
  description: {
    type: String,
    required: true,
    default: true,
  },
  driveType: {
    type: String,
    required: true,
    default: true,
  },
  motorType: {
    type: String,
    required: true,
    default: true,
  },
  robotHeight: {
    type: Number,
    required: true,
    default: true,
  },
  robotWeight: {
    type: Number,
    required: true,
    default: true,
  },
  rookieYear: {
    type: Number,
    required: true,
    default: true,
  },
  teamCountry: {
    type: String,
    required: true,
    default: true,
  },
  teamName: {
    type: String,
    required: true,
    default: true,
  },
  teamNumber: {
    type: Number,
    required: true,
    default: true,
  },
  teamRating: {
    type: Number,
    required: true,
    default: true,
  },
  robotMeasurement: {
    left: {
      type: Number,
      required: true,
      default: true,
    },
    right: {
      type: Number,
      required: true,
      default: true,
    },
    front: {
      type: Number,
      required: true,
      default: true,
    },
    back: {
      type: Number,
      required: true,
      default: true,
    },
  },
});

const Robot = model("robot", RobotSchema);

export default Robot;