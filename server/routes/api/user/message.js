// Got this part from https://github.com/ThomasFoydel/socialmedia/blob/master/models/privateMessage.js
// I will most likely write this myself. But I want to test the features our right now.

const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');

const PrivateMessage = require('../../../models/User/PrivateMessage');

router.get('/getMessage/:id', auth, async (req, res) => {
  const friendId = req.params.id;
  const userId = req.tokenUser.userId;
  const privateMessagesArray = await PrivateMessage.find({
    $and: [
      { participants: { $in: [friendId] } },
      { participants: { $in: [userId] } },
    ],
  }).sort({ createdAt: 1 });
  res.status(201).send(privateMessagesArray);
});

router.post('/send/:id', auth, async (req, res) => {
  const newPrivateMessage = new PrivateMessage({
    sender: req.tokenUser.userId,
    recipient: req.params.id,
    participants: [req.tokenUser.userId, req.params.id],
    content: req.body.message,
  });
  newPrivateMessage
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) =>
      console.log('private message to offline user error: ', err)
    );
});

module.exports = router;