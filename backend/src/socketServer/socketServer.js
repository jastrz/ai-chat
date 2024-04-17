import { Server } from "socket.io";
import ReceiveActions from "./actions/receiveActions.js";
import verifyTokenSocket from "../middleware/authSocket.js";

let io = null;

function initSocketServer(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    verifyTokenSocket(socket, next);
  });

  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    // subscribe all receive actions
    const receiveActions = Object.values(ReceiveActions);
    receiveActions.forEach((action) => {
      socket.on(action.name, async (data) => {
        try {
          await action.handler(socket.id, data);
        } catch (err) {
          console.error(
            `Error processing ${action.name}, socketId: ${socket.id}: ${err}`
          );
        }
      });
    });
  });
}

export { io, initSocketServer };
