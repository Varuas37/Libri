const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    category: {
      // type: Schema.Types.ObjectId,
      // ref: "category",
      required: true,
      type: String,
    },
    // subCategory: {
    //   type: Schema.Types.ObjectId,
    //   ref: "subcategory",
    // },

    title: {
      required: true,
      type: String,
      maxlength: 100,
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
      //   required: true,
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("product", ProductSchema);
