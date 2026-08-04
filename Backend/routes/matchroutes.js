const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const MatchRequest = require("../models/MatchRequest");
const Chat = require("../models/Chat");

const getOrCreateChat = async (userId, matchedUserId) => {
  let chat = await Chat.findOne({ users: { $all: [userId, matchedUserId] } });

  if (!chat) {
    chat = await Chat.create({ users: [userId, matchedUserId] });
  }

  return chat;
};

router.post("/find", async (req, res) => {
  try {
    const { userId, gender, lookingFor, requestId, location } = req.body;
    const vibes = Array.isArray(req.body.vibes)
      ? [...new Set(req.body.vibes.map((vibe) => String(vibe).trim()).filter(Boolean))]
      : [];

    const latitude = Number(location?.latitude);
    const longitude = Number(location?.longitude);
    const hasValidLocation = Number.isFinite(latitude) && Number.isFinite(longitude)
      && latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;

    if (!mongoose.isValidObjectId(userId) || !gender || !lookingFor || vibes.length === 0 || !hasValidLocation) {
      return res.status(400).json({
        message: "Complete your profile, choose an interest, and allow location access before matching.",
      });
    }

    const userLocation = { type: "Point", coordinates: [longitude, latitude] };

    // Resume only the match request from this search session. Older matches
    // must not prevent a user from starting a new compatible conversation.
    const existingMatch = mongoose.isValidObjectId(requestId)
      ? await MatchRequest.findOne({
        _id: requestId,
        userId,
        status: "matched",
        matchedUser: { $ne: null },
      })
      : null;

    if (existingMatch) {
      const chat = await getOrCreateChat(userId, existingMatch.matchedUser);
      return res.json({ matched: true, chatId: chat._id });
    }

    // Keep using this session's waiting request while polling. A new browser
    // session gets one fresh request and removes only stale waiting requests.
    let current = mongoose.isValidObjectId(requestId)
      ? await MatchRequest.findOne({ _id: requestId, userId, status: "waiting" })
      : null;

    if (!current) {
      await MatchRequest.deleteMany({ userId, status: "waiting" });
      current = await MatchRequest.create({
        userId,
        gender: String(gender).trim(),
        lookingFor: String(lookingFor).trim(),
        vibes,
        location: userLocation,
        status: "waiting",
      });
    } else {
      current.location = userLocation;
      await current.save();
    }

    // Atomically claim the oldest compatible waiting request. This prevents
    // two new users from being matched to the same person at once.
    const partner = await MatchRequest.findOneAndUpdate(
      {
        _id: { $ne: current._id },
        userId: { $ne: userId },
        gender: current.lookingFor,
        lookingFor: current.gender,
        vibes: { $in: vibes },
        location: {
          $near: {
            $geometry: userLocation,
            $maxDistance: 10000,
          },
        },
        status: "waiting",
      },
      {
        $set: {
          status: "matched",
          matchedUser: userId,
        },
      },
      {
        returnDocument: "after",
      }
    );

    if (!partner) {
      return res.json({ matched: false, requestId: current._id });
    }

    current.status = "matched";
    current.matchedUser = partner.userId;
    await current.save();

    const chat = await getOrCreateChat(userId, partner.userId);
    return res.json({ matched: true, chatId: chat._id });
  } catch (error) {
    console.error("Match error:", error.message);
    return res.status(500).json({ message: "Unable to find a match right now." });
  }
});

module.exports = router;
