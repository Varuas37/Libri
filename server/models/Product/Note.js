const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NoteSchema = new mongoose.Schema(
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

    description: {
      required: true,
      type: String,
    },

    shipping: {
      required: true,
      type: Boolean,
      default: false,
    },

    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("note", NoteSchema);

module.exports = { Note };
