import { Server } from "socket.io";
import { processPrompt } from "./requests/requestHandler.js";
import * as sessionManager from "./session/sessionManager.js";
import { cancelRequest } from "./requests/requestProcessor.js";

let io = null;

const ReceiveActions = {
  Initialize: {
    name: "initialize",
    handler: handleUserConnected,
  },
  Prompt: {
    name: "sendPrompt",
    handler: handlePromptReceived,
  },
  CancelPrompt: {
    name: "cancelPrompt",
    handler: handleCancelPrompt,
  },
  ImageGenSettings: {
    name: "imageGenSettings",
    handler: handleImageGenerationSettings,
  },
  TextGenSettings: {
    name: "textGenSettings",
    handler: handleTextGenerationSettings,
  },
  Reset: {
    name: "reset",
    handler: handleReset,
  },
};

export const SendActions = {
  Message: "message",
  MessageFragment: "messageFragment",
  UpdatePromptState: "promptStateChanged",
};

export const RequestStatus = {
  Pending: "pending",
  Processed: "processed",
  Completed: "completed",
};

function initSocketServer(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    // subscribe all receive actions
    const receiveActions = Object.values(ReceiveActions);
    receiveActions.forEach((action) => {
      socket.on(action.name, (data) => action.handler(socket.id, data));
    });

    socket.on("disconnect", () => {
      console.log(`user disconnected: ${socket.id}`);
      sessionManager.handleUserDisconnected(socket.id);
    });
  });
}

function handleUserConnected(socketId, data) {
  sessionManager.handleUserConnected(socketId, data);
}

function handlePromptReceived(socketId, data) {
  console.log(data);
  const session = sessionManager.getSessionBySocketId(socketId);
  const userMessage = {
    username: session.username,
    content: [{ data: data.message, type: "text" }],
  };

  // send message to other sockets associated with current user
  session.broadcast("message", userMessage, [socketId]);
  processPrompt(session, data);
}

function handleCancelPrompt(socketId, data) {
  cancelRequest(data);
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
