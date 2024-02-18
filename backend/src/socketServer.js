import { Server } from "socket.io";
import { llamaService } from "./services/llamaService.js";
import { getImage } from "./services/sdService.js";

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

    socket.on("sendMessage", (data) => {
      console.log(
        `prompt sent from ${socket.id}, type: ${data.type}, message: ${data.message}`
      );
      handleMessageReceived(socket.id, data);
    });

    socket.on("reset", () => {
      handleReset();
    });
  });
};

const handleMessageReceived = async (socketId, data) => {
  let answer;
  switch (data.type) {
    case "text":
      llamaService.start();
      answer = await llamaService.prompt(data.message);
      console.log(answer);
      break;
    case "image":
      const imagePrompt = {
        prompt: data.message,
        height: 768,
        width: 768,
      };
      answer = await getImage(imagePrompt);
      break;
    default:
      break;
  }

  io.to(socketId).emit("message", {
    username: "AI",
    content: answer,
    type: data.type,
  });
};

const handleReset = async (socketId) => {
  console.log("reset goin on");
};

export { initSocketServer };
