const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: 1,
    maxlength: 50,
    required: true,
  },
});
module.exports = Category = mongoose.model("category", CategorySchema);
