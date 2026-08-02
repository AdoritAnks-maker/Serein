const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    lookingFor: {
      type: String,
      enum: ["Male", "Female", "Anyone"],
      required: true,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 250,
    },

    vibes: [
      {
        type: String,
        enum: [
          "Coffee",
          "Romance",
          "Trekking",
          "Travel",
          "Movies",
          "Music",
          "Fitness",
          "Reading",
          "Photography",
          "Foodie",
          "Gaming",
          "Tech",
          "Startups",
          "Coding",
          "Study",
          "Cricket",
          "Football",
          "Anime",
          "Pets",
          "Nature",
        ],
      },
    ],

    isOnline: {
      type: Boolean,
      default: false,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({
  location: "2dsphere",
});

module.exports = mongoose.model(
  "User",
  userSchema
);