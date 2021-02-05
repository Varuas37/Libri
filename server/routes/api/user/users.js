const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const { json } = require("body-parser");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Confirmationemail = process.env.EMAIL;
const emailPassword = process.env.SUPPORT_LOGIN_PASSWORD;
const User = require("../../../models/User/User");
const Profile = require("../../../models/User/UserProfile")
const auth = require("../../../middleware/auth");


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
    check("studentUniversity", "University is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Destructure to pull our name, email and password from the req.body
    const { name, lastname, email, password,studentUniversity } = req.body;
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
        studentUniversity,
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

      // Sending Email for Confirmation
      var transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: Confirmationemail, // your domain email address
          pass: emailPassword, // your password
        },
      });

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "1d" },
        (err, emailToken) => {
          const url = `http://localhost:5500/api/users/confirm/${emailToken}`;
          transporter.sendMail({
            to: user.email,
            from: "support@libri.fun",
            subject: "Confirm Email",
            html: `Please click on this <a href="${url}">link</a> to confirm your account`,
          });

          console.log("Email Sent");
        }
      );
      return res.json({ msg: "Please confirm your email to log in" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/confirm/:token", async (req, res) => {
  try {
    const {
      user: { id },
    } = jwt.verify(req.params.token, config.get("jwtSecret"));

    try {
      var useros = await User.findById(id).exec();

      if (!useros) {
        return res.status(422).json({ error: `${typeof UserID}` });
      }
      useros.confirmed = true;
      await useros.save();
      return res.redirect("http://localhost:3000/login");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    res.send(`${err}`);
    console.log(err);
  }
});

// router.put("/follow/:id", auth, (req, res) => {
//   User.findByIdAndUpdate(
//     req.params.id,
//     {
//       $push: { followers: req.user },
//     },
//     {
//       new: false,
//     },
//     (err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       }
//       User.findByIdAndUpdate(
//         req.user,
//         {
//           $push: { following: req.params.id },
//         },
//         { new: false }
//       )
//         .select("-password")
//         .then((result) => {
//           res.json(result);
//         })
//         .catch((err) => {
//           return res.status(422).json({ error: err });
//         });
//     }
//   );
// });

// router.put("/follow/:id", auth, async (req, res) => {
//   try {
//     const id = req.params.id
//     var followedUser = await User.findByIdAndUpdate(id,{$push:{followers: req.user.id}});

    


//   } catch (err) {
//     res.send({ err: err });
//   }
// });

// router.put("/unfollow/:id", auth, (req, res) => {
//   User.findByIdAndUpdate(
//     req.params.id,
//     {
//       $pull: { followers: req.user},
//     },
//     {
//       new: true,
//     },
//     (err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       }
//       User.findByIdAndUpdate(
//         req.user,
//         {
//           $pull: { following: req.params.id },
//         },
//         { new: true }
//       )
//         .select("-password")
//         .then((result) => {
//           res.json(result);
//         })
//         .catch((err) => {
//           return res.status(422).json({ error: err });
//         });
//     }
//   );
// });

module.exports = router;

// jwt.sign(
//   payload,
//   config.get("jwtSecret"),
//   { expiresIn: 360000 },
//   (err, token) => {
//     if (err) throw err;
//     // res.json({ token });
//   }
// );
