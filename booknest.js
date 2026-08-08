import express from "express";
import auth from './Routes/userRoute.js'
import protect from './Routes/protectRoute.js'
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import rateLimit from "express-rate-limit";
import business from './Routes/businesRoute.js';
import http from "http";
import { initSocket } from "./Socket/socket.js";

dotenv.config();

const app = express();
const url = 'mongodb+srv://Sahil:Sahil0998@booknest.qstoppn.mongodb.net/booknest?retryWrites=true&w=majority';
const server = http.createServer(app);

app.use(cors({
  origin: "http://localhost:5173", credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', auth);
app.use('/protected', protect);
app.use('/fromData', business);

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

mongoose.connect(url)
  .then(() => {
    console.log("Database Connected")
  })
  .catch((err) => {
    console.log("Backend Problem", err);
  })


server.listen(5600, () => {
  console.log("Server running on port 5600");
});