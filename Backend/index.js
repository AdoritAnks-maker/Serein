require("dotenv").config();


const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");



// Routes

const authRoutes = require("./routes/authRoutes");
const matchRoutes = require("./routes/matchRoutes");
const chatRoutes = require("./routes/chatRoutes");


// Models

const Chat = require("./models/Chat");





const app = express();





// Middleware


app.use(

cors({

    origin:"http://localhost:5173",

    methods:[
        "GET",
        "POST",
        "PUT",
        "DELETE"
    ],

    credentials:true

})

);



app.use(express.json());







// API Routes


app.use(
"/api/auth",
authRoutes
);


app.use(
"/api/match",
matchRoutes
);


app.use(
"/api/chat",
chatRoutes
);








// MongoDB Connection


mongoose
.connect(process.env.MONGO_URI)

.then(()=>{

    console.log("✅ Mongo Connected");

})

.catch((err)=>{


    console.log("❌ Mongo Connection Error");

    console.log(err.message);


});









// Test Route


app.get("/",(req,res)=>{


    res.send(
        "Backend Running Successfully"
    );


});









// HTTP Server


const server = http.createServer(app);









// Socket.io


const io = new Server(

server,

{

cors:{

    origin:"http://localhost:5173",

    methods:[
        "GET",
        "POST"
    ]

}

}

);









let onlineUsers = 0;








io.on(

"connection",

(socket)=>{


console.log(
"User Connected:",
socket.id
);





onlineUsers++;




io.emit(

"online_users",

onlineUsers

);










// JOIN ROOM


socket.on(

"join-room",

(roomId)=>{


    socket.join(roomId);



    console.log(

    `User joined room ${roomId}`

    );


}

);











// SEND MESSAGE


socket.on(

"send-message",

async(data)=>{


    try{



        console.log(

            "Message:",

            data.text

        );





        // Save message in MongoDB


        await Chat.findByIdAndUpdate(

            data.room,

            {

                $push:{

                    messages:{


                        sender:data.sender,


                        text:data.text


                    }

                }

            }

        );








        // Emit message to room


        io.to(data.room)

        .emit(

            "receive-message",

            data

        );





    }

    catch(error){


        console.log(

            "Message Save Error:",

            error

        );


    }



}

);











// DISCONNECT


socket.on(

"disconnect",

()=>{


    console.log(

    "User Disconnected:",

    socket.id

    );



    onlineUsers--;



    io.emit(

    "online_users",

    onlineUsers

    );



}

);






}

);











// Server Start


const PORT = process.env.PORT || 5000;



server.listen(

PORT,

()=>{


console.log(

`🚀 Server running on ${PORT}`

);


}

);