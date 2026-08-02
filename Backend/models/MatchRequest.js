const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// A match must contain exactly two users
matchSchema.path("users").validate(function (users) {
  return users.length === 2;
}, "A match must have exactly two users.");

module.exports = mongoose.model(
  "Match",
  matchSchema
);