const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  cart: {
    type: Array,
    default: [],
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  resetToken: {
    type: String,
  },
  expireToken: {
    type: Date,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  courses: {
    type: Array,
    default: [],
  },
  university: {
    type: Schema.Types.ObjectId,
    ref: "university",
  },
  requestsSent: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  requests: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  blocked:[
    {
      type:Schema.Types.ObjectId,
      ref:"user",
    }
  ]
});

module.exports = User = mongoose.model("user", UserSchema);
