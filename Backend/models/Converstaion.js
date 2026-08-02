const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// A conversation should always contain exactly two users
conversationSchema.path("participants").validate(function (participants) {
  return participants.length === 2;
}, "A conversation must have exactly two participants.");

module.exports = mongoose.model(
  "Conversation",
  conversationSchema
);