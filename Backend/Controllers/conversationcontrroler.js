const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// ======================================
// CREATE A NEW CONVERSATION
// ======================================

const createConversation = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user.id;

    if (!receiverId) {
      return res.status(400).json({
        message: "Receiver ID is required",
      });
    }

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (conversation) {
      return res.status(200).json({
        message: "Conversation already exists",
        conversation,
      });
    }

    // Create new conversation
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });

    res.status(201).json({
      message: "Conversation created successfully",
      conversation,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ======================================
// GET ALL CONVERSATIONS OF LOGGED-IN USER
// ======================================

const getConversations = async (req, res) => {

  try {

    const userId = req.user.id;

    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate(
        "participants",
        "username email bio vibes isOnline"
      )
      .populate("lastMessage")
      .sort({
        updatedAt: -1,
      });

    res.status(200).json(conversations);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ======================================
// GET SINGLE CONVERSATION
// ======================================

const getConversationById = async (req, res) => {

  try {

    const conversation = await Conversation.findById(
      req.params.id
    )
      .populate(
        "participants",
        "username email bio vibes isOnline"
      )
      .populate("lastMessage");

    if (!conversation) {

      return res.status(404).json({
        message: "Conversation not found",
      });

    }

    res.status(200).json(conversation);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ======================================
// DELETE CONVERSATION
// ======================================

const deleteConversation = async (req, res) => {

  try {

    const conversation =
      await Conversation.findByIdAndDelete(
        req.params.id
      );

    if (!conversation) {

      return res.status(404).json({
        message: "Conversation not found",
      });

    }

    // Delete all messages of that conversation
    await Message.deleteMany({
      conversation: req.params.id,
    });

    res.status(200).json({
      message:
        "Conversation deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  createConversation,
  getConversations,
  getConversationById,
  deleteConversation,
};