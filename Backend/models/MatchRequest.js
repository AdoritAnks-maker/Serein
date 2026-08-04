const mongoose = require("mongoose");


const matchRequestSchema = new mongoose.Schema({



    userId:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    },



    gender:{

        type:String,

        required:true

    },



    lookingFor:{

        type:String,

        required:true

    },



    vibes:[

        {

            type:String

        }

    ],

    location:{
        type:{
            type:String,
            enum:["Point"],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },




    status:{

        type:String,

        default:"waiting"

    },





    matchedUser:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        default:null

    }





},{

    timestamps:true

});

matchRequestSchema.index({ location:"2dsphere" });





module.exports = mongoose.model(

    "MatchRequest",

    matchRequestSchema

);
