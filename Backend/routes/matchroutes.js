const express = require("express");

const router = express.Router();

const MatchRequest = require("../models/MatchRequest");
const Chat = require("../models/Chat");



router.post("/find", async(req,res)=>{


try{


const {
    userId,
    gender,
    lookingFor,
    vibes
}=req.body;



console.log("MATCH DATA:",{
    userId,
    gender,
    lookingFor,
    vibes
});





// remove old waiting request of same user

await MatchRequest.deleteMany({

    userId:userId,

    status:"waiting"

});





// create new request

const current = await MatchRequest.create({

    userId,

    gender,

    lookingFor,

    vibes,

    status:"waiting"

});





console.log("CURRENT:",current);






// find opposite user

const match = await MatchRequest.findOne({

    userId:{
        $ne:userId
    },


    gender:lookingFor,


    lookingFor:gender,


    vibes:{
        $in:vibes
    },


    status:"waiting"


});





console.log("MATCH:",match);





if(!match){


return res.json({

    matched:false,

    message:"Waiting for match",

    requestId:current._id

});


}








// update both

current.status="matched";

match.status="matched";


current.matchedUser=match.userId;

match.matchedUser=userId;



await current.save();

await match.save();








// create chat

let chat = await Chat.findOne({

users:{
    $all:[
        userId,
        match.userId
    ]
}

});





if(!chat){


chat = await Chat.create({

users:[
    userId,
    match.userId
]

});


}







console.log("CHAT:",chat._id);





return res.json({

matched:true,

message:"Match Found",

chatId:chat._id

});



}
catch(err){


console.log(err);


res.status(500).json({

error:err.message

});


}



});



module.exports=router;