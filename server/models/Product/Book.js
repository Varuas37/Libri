const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "subcategories",
    },

    name: {
      required: true,
      type: String,
      maxlength: 100,
    },
    price: {
      required: true,
      type: Number,
    },
    condition: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },

    shipping: {
      required: true,
      type: Boolean,
      default: false,
    },
    available: {
      type: Boolean,
    },
    images: {
      // required: true,
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("book", BookSchema);

module.exports = { Book };
