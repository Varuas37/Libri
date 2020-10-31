const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");
const Profile = require("../../../models/User/UserProfile");
const User = require("../../../models/User/User");
const checkObjectId = require("../../../middleware/checkObjectId");
//@route GET api/profile
//@desc  Get current users profile
//@access Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile({ user: req.user.id });
    await profile
      .populate("user", ["name", "lastname", "avatar", "courses"])
      .execPopulate();
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error 🙆🏻‍♂️");
  }
});

//@route POST api/profile
//@desc  Create and Update Profile
//@access Private

router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors) {
    console.log("Error");
    return res.status(400).json({ errors: errors.array });
  }

  const {
    location,
    bio,
    classof,
    university,
    fieldOfStudy,
    twitter,
    instagram,
    linkedin,
    facebook,
    social,
  } = req.body;
  //Build Profile fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (university) profileFields.university = university;
  if (fieldOfStudy) profileFields.fieldOfStudy = fieldOfStudy;
  if (classof) profileFields.classof = classof;

  // Build social object and add to profileFields
  profileFields.social = {};
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (facebook) profileFields.social.facebook = location;

  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      console.log(profileFields);

      return res.json(profile);
    }

    //Create Profile
    profile = await Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error 🥺");
  }
});

// //@route GET api/profile/users
// //@desc  Get all profiles
// //@access Public

router.get("/users", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "name",
      "lastname",
      "courses",
      "avatar",
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error 🙆🏻‍♂️");
  }
});

//@route GET api/profile/user/:user_id
//@desc  Get profile by user id
//@access Public

router.get(
  "/user/:user_id",
  checkObjectId("user_id"),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id,
      }).populate("user", ["name", "lastname", "avatar"]);

      if (!profile) return res.status(400).json({ msg: "Profile not found" });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Server Error 🙆🏻‍♂️" });
    }
  }
);

//@route DELETE api/profile/user
//@desc  Delete profile, user and posts
//@access Private

router.delete("/user", auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndDelete({ user: req.user_id });
    // Remove user
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: "User Deleted " });
  } catch (err) {
    res.status(500).send("Server Error 🙆🏻‍♂️");
  }
});

//@route PUT api/profile/education
//@desc  Posts student's college information
//@access Private
router.put(
  "/experience",
  [
    auth,
    [
      check("company", "Name of the company is required").not().isEmail(),
      check("position", "Position is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      position,
      from,
      to,
      current,
      description,
      location,
    } = req.body;
    const newExp = {
      company,
      position,
      from,
      to,
      current,
      description,
      location,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.status(200).json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error 📚");
    }
  }
);
//@route DELETE api/profile/experience
//@desc  Delete experience from profile
//@access Private
router.delete("/experience/:exp:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get Remove Index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error 📚");
  }
});
module.exports = router;
