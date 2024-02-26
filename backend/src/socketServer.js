import { Server } from "socket.io";
import { handleMessageReceived, handleReset } from "./requestHandler.js";

let io = null;

const initSocketServer = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on("sendPrompt", (data) => {
      console.log(`prompt sent from ${socket.id}, ${JSON.stringify(data)}`);
      handleMessageReceived(socket.id, data);
    });

    socket.on("reset", () => {
      handleReset();
    });
  });
};

export { io, initSocketServer };
