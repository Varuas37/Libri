const express = require("express");
// const admin = require("../../../middleware/admin");
const auth = require("../../../middleware/auth");
require("dotenv").config();
const router = express.Router();
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");

// const multer = require("multer");
const { check, validationResult } = require("express-validator");

// const UserProfile = require("../../../models/user/UserProfile");
const User = require("../../../models/User/User");

const Product = require("../../../models/product/Product");

//=================================
//             Product
//=================================
//@route    POST api/product/image-upload
//@desc     Upload an Image
//@access   Private

router.delete("/image-delete/:id"),
  (req, res) => {
    const ID = Object.findById(req.params.id);
    cloudinary.uploader.destroy(`${ID}`, function (error, result) {
      console.log(result, error);
    });
  };

//@route    POST api/product
//@desc     Create a listing
//@access   Private

router.post(
  "/",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("condition", "Condition is required").not().isEmpty(),
      check("price", "Price is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select("-password"); //req.user.id has the token needed.
    try {
      const newProduct = new Product({
        //User Data
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
        //Data about product.
        title: req.body.title,
        description: req.body.description,
        condition: req.body.condition,
        price: req.body.price,
        category: req.body.category,
        images: req.body.images,
      });

      const post = await newProduct.save();
      res.json(post);
      console.log(req.body.images);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
      console.log("Bitch");
    }
  }
);

//@route    GET api/product
//@desc     Get a Product
//@access   Private

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@route    GET api/product/:id
//@desc     Get a product by ID
//@access   Private

router.get("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product Not Found" });
    }

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Product Not Found" });
    } else {
      res.status(500).send("Server Error");
    }
  }
});
//@route    DELETE api/products/:id
//@desc     Delete a post
//@access   Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "product Not Found" });
    }
    //Check user
    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    } else {
      await product.remove();
      res.json({ msg: "product removed" });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "product Not Found" });
    } else {
      res.status(500).send("Server Error");
    }
  }
});

module.exports = router;
