const express = require("express");
// const admin = require("../../../middleware/admin");
const auth = require("../../../middleware/auth");
require("dotenv").config();
const router = express.Router();

const cloudinary = require("cloudinary");

const { check, validationResult } = require("express-validator");

// const UserProfile = require("../../../models/user/UserProfile");
const User = require("../../../models/User/User");

const Event = require("../../../models/Product/Event");

//=================================
//             EVENT
//=================================

//@route    POST api/event
//@desc     Create an event
//@access   Private

router.post(
  "/",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("type", "Type of event is required").not().isEmpty(),
      check("price", "Price is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
      check("location", "Location is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select("-password"); //req.user.id has the token needed.
    try {
      const newEvent = new Event({
        //User Data
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
        //Data about event.
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        price: req.body.price,
        category: req.body.category,
        images: req.body.images,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        onCampus: req.body.onCampus,
        freeFood: req.body.freeFood,
        location: req.body.location,
      });

      const event = await newEvent.save();
      res.json(event);
      console.log(req.body.images);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    GET api/event
//@desc     Get a event
//@access   Private

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ _id: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@route    GET api/event/:id
//@desc     Get a event by ID
//@access   Private

router.get("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: "Event Not Found" });
    }

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Event Not Found" });
    } else {
      res.status(500).send("Server Error");
    }
  }
});
//@route    DELETE api/events/:id
//@desc     Delete an event
//@access   Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: "Event Not Found" });
    }
    //Check user
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    } else {
      await event.remove();
      res.json({ msg: "Event removed" });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Event Not Found" });
    } else {
      res.status(500).send("Server Error");
    }
  }
});

module.exports = router;
