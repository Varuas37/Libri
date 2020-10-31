const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../../models/User/User");

//@route POST api/users/register
//@desc Test route
//@access Public

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid Email").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("lastname", "Last Name is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Destructure to pull our name, email and password from the req.body
    const { name, lastname, email, password } = req.body;
    try {
      // See if user exists. Send an error if it does
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      // Get user's gravatar.
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "retro",
      });

      //Now we will take the instance of the user we just created above and set the values.
      user = new User({
        name,
        lastname,
        email,
        password,
        avatar,
      });
      //Encrypt the password using Bcrypt.
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();
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
