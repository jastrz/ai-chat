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
  let response = { username: "AI", content: [] };
  switch (data.type) {
    case "text":
      answer = await llamaService.prompt(data.message);
      console.log(answer);
      response.content.push({ data: answer, type: "text" });
      break;
    case "image":
      const imagePrompt = {
        prompt: data.message,
        height: 512,
        width: 512,
      };
      answer = await getImage(imagePrompt);
      response.content.push({ data: "here's generated image: ", type: "text" });
      response.content.push({ data: answer, type: "image" });
      break;
    default:
      break;
  }

  io.to(socketId).emit("message", response);
};

const handleReset = async (socketId) => {
  llamaService.reset();
};

export { initSocketServer };
