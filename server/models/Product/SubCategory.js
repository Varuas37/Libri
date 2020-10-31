const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: 1,
    maxlength: 50,
  },
});
module.exports = SubCategory = mongoose.model("subcategory", SubCategorySchema);
