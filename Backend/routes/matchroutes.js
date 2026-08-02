const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getMatches,
    getMatchById,
    deleteMatch
} = require("../controllers/matchController");

router.get("/", authMiddleware, getMatches);

router.get("/:id", authMiddleware, getMatchById);

router.delete("/:id", authMiddleware, deleteMatch);

module.exports = router;