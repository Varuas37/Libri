const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");
const User = require("../../../models/User/User");
const checkObjectId = require("../../../middleware/checkObjectId");

//@route GET api/profile
//@desc  Get current users profile
//@access Private

// SEND FRIEND REQUEST
router.get("/:id", auth, async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res
        .status(400)
        .json({ error: "You cannot send friend request to yourself 🔐" });
    }

    let userSendRequestTo = await User.findOne({ _id: req.params.id });
    let currentUser = await User.findOne({ _id: req.user.id });

    
   if(currentUser.requestsSent.indexOf(req.params.id) !== -1){
    return res
    .status(400)
    .json({ error: "Request Already Sent 🔐" });
   }
    await currentUser.update({
      $push: { requestsSent: req.params.id,following:req.params.id },
    });
    currentUser.save();
    await userSendRequestTo.update({
      $push: { requests: req.user.id },
    });
    userSendRequestTo.save();
    res.status(400).send(userSendRequestTo);
  } catch (err) {
    console.error("Server Error 💁🏽‍♂️");
    res.status(500).send(err.message);
  }
});

// ACCEPT FRIEND REQUEST
router.get("/accept/:id", auth, async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res
        .status(400)
        .json({ error: "You cannot accept friend Request from yourself 🔐" });
    }
    let userRecieveRequest = await User.findOne({ _id: req.params.id });
    let currentUser = await User.findOne({ _id: req.user.id });
 
    if(currentUser.friends.indexOf(req.params.id) !== -1){
        return res
        .status(400)
        .json({ error: "You are already Friends 🔐" });
       }
    await currentUser.update({
      $pull: { requests: req.params.id },
      $push: {
        friends: req.params.id,
        followers: req.params.id,
      },
    });

    currentUser.save();

    await userRecieveRequest.update({
      $pull: { requestsSent: req.user.id },
      $push: {
        friends: req.user.id,
        following: req.user.id,
        followers: req.params.id,
      },
    });
    userRecieveRequest.save();
    res.status(400).send(userRecieveRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});
// REMOVE FRIEND REQUEST
router.get("/remove/:id", auth, async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res
        .status(400)
        .json({ error: "You cannot send Friend Request to Yourself 🔐" });
    }
    let user = await User.findOne({ _id: req.params.id });
    let currentUser = await User.findOne({ _id: req.user.id });
 
    if(currentUser.requestsSent.indexOf(req.params.id) == -1){
        return res
        .status(400)
        .json({ error: "No request recieved 🔐" });
       }
    
    await currentUser.update({
      $pull: { requests: req.params.id },
    });
    currentUser.save();

    await userSendRequestTo.update({
      $push: { requests: req.user.id },
    });
    userSendRequestTo.save();
    res.status(400).send(userSendRequestTo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error 💁🏽‍♂️");
  }
});

//   BLOCK USER
router.get("/block/:id", auth, async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res
        .status(400)
        .json({ error: "You cannot send Friend Request to Yourself 🔐" });
    }
    let userSendRequestTo = await User.findOne({ _id: req.params.id });
    let currentUser = await User.findOne({ _id: req.user.id });

    await currentUser.update({
      $push: { requestsSent: req.params.id },
    });
    currentUser.save();

    await userSendRequestTo.update({
      $push: { requests: req.user.id },
    });
    userSendRequestTo.save();
    res.status(400).send(userSendRequestTo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error 💁🏽‍♂️");
  }
});

module.exports = router;
