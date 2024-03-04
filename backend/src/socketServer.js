import { Server } from "socket.io";
import { processPrompt } from "./requests/requestHandler.js";
import * as sessionManager from "./session/sessionManager.js";
import { cancelRequest } from "./requests/requestProcessor.js";

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

    socket.on("initialize", (data) => {
      console.log(data);
      sessionManager.handleUserConnected(socket.id, data);
    });

    socket.on("sendPrompt", (data) => {
      console.log(`prompt sent from ${socket.id}, ${JSON.stringify(data)}`);
      handlePromptReceived(socket.id, data);
    });

    socket.on("cancelPrompt", (data) => {
      handleCancelPrompt(socket.id, data);
    });

    socket.on("imageGenSettings", (data) => {
      handleImageGenerationSettings(socket.id, data);
    });

    socket.on("textGenSettings", (data) => {
      handleTextGenerationSettings(socket.id, data);
    });

    socket.on("reset", () => {
      handleReset();
    });

    socket.on("disconnect", () => {
      console.log(`user disconnected: ${socket.id}`);
      sessionManager.handleUserDisconnected(socket.id);
    });
  });
};

function handleCancelPrompt(socketId, data) {
  cancelRequest(data);
}

function handlePromptReceived(socketId, data) {
  const session = sessionManager.getSessionBySocketId(socketId);
  const userMessage = {
    username: session.username,
    content: [{ data: data.message, type: "text" }],
  };

  // send message to other sockets associated with current user
  session.broadcast("message", userMessage, [socketId]);
  processPrompt(session, data);
}

function handleTextGenerationSettings(socketId, data) {
  const session = sessionManager.getSessionBySocketId(socketId);
  session.textPromptSettings = { ...session.textPromptSettings, ...data };

  console.log(session);
}

function handleImageGenerationSettings(socketId, data) {
  const session = sessionManager.getSessionBySocketId(socketId);

  // Match the names of variables in the settings with the names in the SD API
  const { numImages, negativePrompt, ...settings } = data;
  const imageGenSettings = {
    ...settings,
    batch_size: numImages,
    negative_prompt: negativePrompt,
  };
  session.imagePromptSettings = {
    ...imageGenSettings,
    ...session.imageGenSettings,
  };

  console.log(session);
}

function handleReset() {
  llamaService.reset();
}

export { io, initSocketServer };
