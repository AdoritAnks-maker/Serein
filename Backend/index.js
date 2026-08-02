console.log("THIS IS MY INDEX FILE");

require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// ==============================
// Import Routes
// ==============================

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const swipeRoutes = require("./routes/swipeRoutes");
const matchRoutes = require("./routes/matchRoutes");

console.log("ALL ROUTES IMPORTED");

const app = express();
app.use(cors());
app.use(express.json());

console.log("Mongo URI:");
console.log(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/conversations", conversationRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/swipe", swipeRoutes);

app.use("/api/matches", matchRoutes);


console.log("Connecting to MongoDB...");

mongoose
    .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
    })
    .then(() => {

        console.log("✅ MongoDB Connected Successfully");

    })
    .catch((err) => {

        console.log("❌ MongoDB Connection Failed");

        console.log(err.message);

    });



const server = http.createServer(app);


const io = new Server(server, {

    cors: {

        origin: "http://localhost:5173",

        methods: ["GET", "POST"],

    },

});

let onlineUsers = 0;

io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    onlineUsers++;

    io.emit("online_users", onlineUsers);

    socket.on("send_message", (data) => {

        io.emit("receive_message", data);

    });

    socket.on("typing", () => {

        socket.broadcast.emit("user_typing");

    });

    socket.on("disconnect", () => {

        console.log("User Disconnected:", socket.id);

        onlineUsers--;

        io.emit("online_users", onlineUsers);

    });

});



app.get("/", (req, res) => {

    res.send("Backend Running Successfully 🚀");

});



const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});