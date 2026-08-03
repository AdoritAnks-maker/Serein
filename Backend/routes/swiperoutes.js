const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    swipeUser,
    getMySwipes,
    deleteSwipe
} = require("../controllers/swipecontroller");

router.post("/", authMiddleware, swipeUser);

router.get("/", authMiddleware, getMySwipes);

router.delete("/:id", authMiddleware, deleteSwipe);

module.exports = router;
