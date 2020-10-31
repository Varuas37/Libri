const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const admin = require("../../../middleware/admin");
const { check, validationResult } = require("express-validator");
const Category = require("../../../models/Product/Category");
const SubCategory = require("../../../models/Product/SubCategory");

router.post(
  "/upload",
  [[check("name", "Category name is required").exists()], auth, admin],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructure to pull out name from the req.body
    const { name } = req.body;
    //See if the category already exists
    try {
      // See if Category exists. Send an error if it does
      let category = await Category.findOne({ name });
      if (category) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Category already exists 🤷🏻‍♂️" }] });
      }
      console.log(req.user);
      category = new Category({
        name,
      });
      category.save();
      res.status(200).send("Category has been created");
      console.log(req.user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ _id: -1 });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.post(
  "/subCategory/upload",

  auth,
  admin,
  async (req, res) => {
    //Destructure to pull out name from the req.body
    const { name } = req.body;
    //See if the Sub category already exists
    try {
      // See if Category exists. Send an error if it does
      let subCategory = await SubCategory.findOne({ name });
      if (subCategory) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Sub Category already exists 🤷🏻‍♂️" }] });
      }
      console.log(req.user);
      subCategory = new SubCategory({
        name,
      });
      subCategory.save();
      res.status(200).send("Sub Category has been created");
      console.log(req.user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);
router.get("/subCategory", async (req, res) => {
  try {
    const subCategory = await SubCategory.find().sort({ _id: -1 });
    res.json(subCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
