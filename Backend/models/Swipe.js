const mongoose = require("mongoose");

const swipeSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      enum: ["Like", "Pass"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate swipes between the same two users
swipeSchema.index(
  {
    fromUser: 1,
    toUser: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "Swipe",
  swipeSchema
);