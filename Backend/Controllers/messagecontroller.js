const Message = require("../models/Message");
const Conversation = require("../models/Conversation");


const sendMessage = async (req, res) => {

    try {

        const {
            conversationId,
            receiverId,
            text
        } = req.body;

        const senderId = req.user.id;

        if (
            !conversationId ||
            !receiverId ||
            !text
        ) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        const message = await Message.create({

            conversation: conversationId,

            sender: senderId,

            receiver: receiverId,

            text

        });

        await Conversation.findByIdAndUpdate(

            conversationId,

            {
                lastMessage: message._id
            }

        );

        res.status(201).json({

            message: "Message sent successfully",

            data: message

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

const getMessages = async (req, res) => {

    try {

        const conversationId =
            req.params.conversationId;

        const messages = await Message.find({

            conversation: conversationId

        })

            .populate(
                "sender",
                "username"
            )

            .populate(
                "receiver",
                "username"
            )

            .sort({
                createdAt: 1
            });

        res.status(200).json(messages);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


const deleteMessage = async (req, res) => {

    try {

        const message =
            await Message.findByIdAndDelete(
                req.params.id
            );

        if (!message) {

            return res.status(404).json({

                message: "Message not found"

            });

        }

        res.status(200).json({

            message:
                "Message deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



const markAsRead = async (req, res) => {

    try {

        const message =
            await Message.findByIdAndUpdate(

                req.params.id,

                {
                    isRead: true
                },

                {
                    new: true
                }

            );

        if (!message) {

            return res.status(404).json({

                message: "Message not found"

            });

        }

        res.status(200).json({

            message:
                "Message marked as read",

            data: message

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    sendMessage,

    getMessages,

    deleteMessage,

    markAsRead

};