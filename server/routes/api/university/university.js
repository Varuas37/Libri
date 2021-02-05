const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../../middleware/auth");

const { remove } = require("../../../models/Posts/Post");
const checkObjectId = require("../../../middleware/checkObjectId");

const University = require("../../../models/User/University")


//@route    POST api/post
//@desc     Create a post
//@access   Private


router.get("/",async (req, res) => {
    try {
      const universities = await University.find();
      res.json(universities);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  module.exports = router;