const Chat = require("../models/Chat");



// GET CHAT DETAILS

const getChat = async(req,res)=>{


    try{


        const chatId = req.params.id;




        const chat = await Chat.findById(chatId);





        if(!chat){


            return res.status(404).json({

                message:"Chat not found"

            });


        }






        res.status(200).json({

            users:chat.users,

            messages:chat.messages


        });







    }

    catch(error){


        res.status(500).json({

            message:error.message

        });



    }



};





module.exports = {

    getChat

};