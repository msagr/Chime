import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoutes.js";
import channelRoutes from "./routes/ChannelRoutes.js";
import path from "path";

const _dirname = path.resolve();

dotenv.config({ path: _dirname + '/server/.env'});

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(
    cors({
        origin: [process.env.ORIGIN, 'https://realtime-chat-65rx.onrender.com'],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    })
);

app.use("/uploads/profiles", express.static("uploads/profiles")); // whenever the request comes to this URL, need to serve static files from directory to this request.
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/channel", channelRoutes);
app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (_ , res) => {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

const server = app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
});

setupSocket(server);

mongoose
    .connect(databaseURL)
    .then(() => console.log("DB connection successful."))
    .catch((err) => console.log(err.message));