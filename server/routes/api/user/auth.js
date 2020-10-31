const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const auth = require("../../../middleware/auth");
const User = require("../../../models/User/User");

const { check, validationResult } = require("express-validator");

//@route POST api/auth
//@desc Auth route
//@access Public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password ");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error 🥺");
  }
});

//@route POST api/auth/login
//@desc Authenticate users and get token
//@access Public

router.post(
  "/login",
  [
    check("email", "Please include a valid Email").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Destructure to pull our name, email and password from the req.body
    const { email, password } = req.body;
    try {
      // See if user exists. Send an error if it does
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials 🔐" }] });
      }

      //Check if the passwords match

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials 🔐" }] });
      }

      //Return the jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
