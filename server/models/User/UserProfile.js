const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  experience: [
    {
      company: { type: String },
      position: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
      location: {
        type: String,
      },
    },
  ],
  location: {
    type: String,
  },
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "university",
  },
  fieldOfStudy: {
    type: String,
  },
  classof: {
    type: String,
  },
  bio: {
    type: String,
    default: "",
  },
  socail: [
    {
      linkdin: {
        type: String,
      },
      instagram: {
        type: String,
      },
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Profile = mongoose.model("userProfile", ProfileSchema);
