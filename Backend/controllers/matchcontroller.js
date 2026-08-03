const Match = require("../models/MatchRequest");


const getMatches = async (req, res) => {
  try {
    const userId = req.user.id;

    const matches = await Match.find({
      users: userId,
    })
      .populate(
        "users",
        "username email bio vibes isOnline"
      )
      .populate("conversation")
      .sort({
        updatedAt: -1,
      });

    res.status(200).json(matches);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


const getMatchById = async (req, res) => {

  try {

    const match = await Match.findById(
      req.params.id
    )
      .populate(
        "users",
        "username email bio vibes isOnline"
      )
      .populate("conversation");

    if (!match) {

      return res.status(404).json({
        message: "Match not found",
      });

    }

    res.status(200).json(match);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


const deleteMatch = async (req, res) => {

  try {

    const match = await Match.findByIdAndDelete(
      req.params.id
    );

    if (!match) {

      return res.status(404).json({
        message: "Match not found",
      });

    }

    res.status(200).json({
      message: "Match deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getMatches,
  getMatchById,
  deleteMatch,
};