const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
  history: {
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
  resetToken:{
    type:String,
  },
  expireToken:{
    type:Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  courses: {
    type: Array,
    default: [],
  },
});

module.exports = User = mongoose.model("user", UserSchema);
