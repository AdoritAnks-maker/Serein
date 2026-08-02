const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({


    username:{

        type:String,

        required:true

    },


    email:{

        type:String,

        required:true,

        unique:true

    },


    password:{

        type:String,

        required:true

    },


    bio:{

        type:String,

        default:""

    },


    gender:{

        type:String,

        default:""

    },


    lookingFor:{

        type:String,

        default:""

    },


    vibe:{

        type:String,

        default:""

    },


    createdAt:{

        type:Date,

        default:Date.now

    }


});



module.exports = mongoose.model(
    "User",
    userSchema
);