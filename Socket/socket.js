import { Server } from "socket.io";

let io;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
];

export const initSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: allowedOrigins,
            credentials: true
        }
    });

    io.on("connection", (socket) => {

        console.log("🔥 User connected:", socket.id);

        socket.on("disconnect", () => {

            console.log(
                "🔴 User disconnected:",
                socket.id
            );

        });

    });

    return io;
};


export const getIO = () => {

    if (!io) {
        throw new Error("Socket.IO is not initialized");
    }

    return io;
};