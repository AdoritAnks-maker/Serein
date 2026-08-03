require("dotenv").config();

const dns = require("node:dns");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const matchRoutes = require("./routes/matchroutes");
const chatRoutes = require("./routes/chatRoutes");
const Chat = require("./models/Chat");

const mongoDnsServers = (process.env.MONGODB_DNS_SERVERS || "8.8.8.8,8.8.4.4")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

if (mongoDnsServers.length > 0) {
  dns.setServers(mongoDnsServers);
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is required. Add it to your environment configuration.");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required. Add it to your environment configuration.");
}

const clientOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || clientOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin is not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => res.send("Serein API is running"));
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/chat", chatRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });

const server = http.createServer(app);
const io = new Server(server, { cors: corsOptions });
let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers += 1;
  io.emit("online_users", onlineUsers);

  socket.on("join-room", (roomId) => {
    if (typeof roomId === "string" && roomId) socket.join(roomId);
  });

  socket.on("send-message", async (data = {}) => {
    try {
      const room = typeof data.room === "string" ? data.room : "";
      const text = typeof data.text === "string" ? data.text.trim() : "";

      if (!room || !text || !data.sender) return;

      const chat = await Chat.findByIdAndUpdate(
        room,
        { $push: { messages: { sender: data.sender, text } } },
        { returnDocument: "after" }
      );

      if (!chat) return;
      io.to(room).emit("receive-message", { room, sender: data.sender, text });
    } catch (error) {
      console.error("Message save error:", error.message);
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = Math.max(0, onlineUsers - 1);
    io.emit("online_users", onlineUsers);
  });
});

const PORT = Number(process.env.PORT) || 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
