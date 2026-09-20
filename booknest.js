import express from "express";
import auth from "./Routes/userRoute.js";
import protect from "./Routes/protectRoute.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import business from "./Routes/businesRoute.js";
import http from "http";
import { initSocket } from "./Socket/socket.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5600;

const server = http.createServer(app);

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use("/auth", auth);
app.use("/protected", protect);
app.use("/fromData", business);


const limiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests, please try again later."
    }
});

app.use(limiter);


initSocket(server);


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log("Database Error:", err);
    });


server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});