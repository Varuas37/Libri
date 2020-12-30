const mongoose = require("mongoose");

const UniversitySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: 1,
    maxlength: 50,
    required: true,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
  },
  image: {
    type: Array,
    default: [],
  },
  description: {
    type: String,
  },
  ranking:{
    type: Number,
  }

});
module.exports = University = mongoose.model("university", UniversitySchema);
