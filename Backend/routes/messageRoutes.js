const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    sendMessage,
    getMessages,
    deleteMessage,
    markAsRead
} = require("../controllers/messagecontroller");

router.post("/", authMiddleware, sendMessage);

router.get("/:conversationId", authMiddleware, getMessages);

router.delete("/:id", authMiddleware, deleteMessage);

router.put("/read/:id", authMiddleware, markAsRead);

module.exports = router;
