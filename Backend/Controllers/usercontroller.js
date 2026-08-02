const User = require("../models/User");

// Log in using prfile
const getProfile = async (req, res) => {

    try {

        const user = await User.findById(
            req.user.id
        )
        .select("-password");


        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }


        res.status(200).json(user);


    } catch(error) {

        res.status(500).json({

            message:error.message

        });

    }

};


// update profile
const updateProfile = async(req,res)=>{

    try{


        const updatedUser =
        await User.findByIdAndUpdate(

            req.user.id,

            req.body,

            {
                new:true
            }

        )
        .select("-password");


        res.status(200).json({

            message:"Profile Updated",

            user:updatedUser

        });


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



const getAllUsers = async(req,res)=>{

    try{


        const users =
        await User.find({

            _id:{
                $ne:req.user.id
            }

        })
        .select("-password");


        res.status(200).json(users);


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



const getUserById = async(req,res)=>{

    try{


        const user =
        await User.findById(
            req.params.id
        )
        .select("-password");


        if(!user){

            return res.status(404).json({

                message:"User not found"

            });

        }


        res.status(200).json(user);


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



module.exports = {

    getProfile,

    updateProfile,

    getAllUsers,

    getUserById

};