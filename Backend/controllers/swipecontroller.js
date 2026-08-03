const Swipe = require("../models/Swipe");
const Match = require("../models/Match");
const Conversation = require("../models/Conversation");


const swipeUser = async (req, res) => {

    try {

        const fromUser = req.user.id;

        const {
            toUser,
            action
        } = req.body;

        if (!toUser || !action) {

            return res.status(400).json({
                message: "toUser and action are required"
            });

        }

        if (fromUser === toUser) {

            return res.status(400).json({
                message: "You cannot swipe yourself"
            });

        }

        
        await Swipe.findOneAndUpdate(

            {
                fromUser,
                toUser
            },

            {
                action
            },

            {
                upsert: true,
                new: true
            }

        );

        if (action === "Pass") {

            return res.status(200).json({
                message: "User Passed"
            });

        }

        const reverseSwipe = await Swipe.findOne({

            fromUser: toUser,

            toUser: fromUser,

            action: "Like"

        });

        if (!reverseSwipe) {

            return res.status(200).json({

                matched: false,

                message: "Like saved"

            });

        }

        let match = await Match.findOne({

            users: {
                $all: [fromUser, toUser]
            }

        });

        if (!match) {

            // Create conversation
            const conversation =
                await Conversation.create({

                    participants: [
                        fromUser,
                        toUser
                    ]

                });

            // Create match
            match = await Match.create({

                users: [
                    fromUser,
                    toUser
                ],

                conversation:
                    conversation._id

            });

        }

        res.status(201).json({

            matched: true,

            message:
                "It's a Match!",

            match

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



const getMySwipes = async (req, res) => {

    try {

        const swipes = await Swipe.find({

            fromUser: req.user.id

        }).populate(

            "toUser",

            "username email bio vibes"

        );

        res.status(200).json(swipes);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


const deleteSwipe = async (req, res) => {

    try {

        const swipe =
            await Swipe.findByIdAndDelete(
                req.params.id
            );

        if (!swipe) {

            return res.status(404).json({

                message: "Swipe not found"

            });

        }

        res.status(200).json({

            message:
                "Swipe deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    swipeUser,

    getMySwipes,

    deleteSwipe

};