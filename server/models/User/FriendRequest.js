const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FriendRequestSchema = new Schema({
  requests:[{
    type: Schema.Types.ObjectId,
    ref: "user",
  }],
  requestRecieved:[{
    type: Schema.Types.ObjectId,
    ref: "user",
  }],
  requestSent:[{
    type: Schema.Types.ObjectId,
    ref: "user",
  }],

  // followers:[{type:Schema.Types.ObjectID,ref:"user"}],
  // following:[{type:ObjectID,ref:"user"}]

});

module.exports = FriendRequest = mongoose.model("friendRequest", FriendRequestSchema);
