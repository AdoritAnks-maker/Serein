const Chat = require("../models/Chat");


const getChat = async (req, res) => {

    try {

        const chat = await Chat.findById(
            req.params.id
        );


        if (!chat) {

            return res.status(404).json({
                message: "Chat not found"
            });

        }


        res.json(chat);


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


module.exports = {
    getChat
};