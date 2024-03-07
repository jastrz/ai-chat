import * as sessionManager from "../session/sessionManager.js";
import { llamaService } from "../../services/llamaService.js";
import { processPrompt } from "../requests/requestHandler.js";
import { SendActions } from "./sendActions.js";
import * as validators from "./receiveActionsValidators.js";

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
  Disconnect: {
    name: "disconnect",
    handler: handleUserDisconnected,
  },
};

function handleUserConnected(socketId, data) {
  sessionManager.handleUserConnected(socketId, data);
}

function handleUserDisconnected(socketId, data) {
  console.log(`user disconnected: ${socketId}`);
  sessionManager.handleUserDisconnected(socketId);
}

function handlePromptReceived(socketId, data) {
  const { error } = validators.promptSchema.validate(data);
  if (error) throw new Error(error);

  const session = sessionManager.getSessionBySocketId(socketId);
  const userMessage = {
    username: session.username,
    content: [{ data: data.message, type: "text" }],
  };

  // send message to other sockets associated with current user
  session.broadcast(SendActions.Message, userMessage, [socketId]);
  processPrompt(session, data);
}

function handleCancelPrompt(socketId, data) {
  cancelRequest(data);
}

function handleTextGenerationSettings(socketId, data) {
  const { error } = validators.textPromptSettingsSchema.validate(data);
  if (error) throw new Error(error);

  const session = sessionManager.getSessionBySocketId(socketId);
  session.textPromptSettings = { ...session.textPromptSettings, ...data };
}

function handleImageGenerationSettings(socketId, data) {
  const { error } = validators.imageGenPromptSettingsSchema.validate(data);
  if (error) throw new Error(error);

  const session = sessionManager.getSessionBySocketId(socketId);
  const imageGenSettings = mapImageGenerationSettings(data);

  session.imagePromptSettings = {
    ...imageGenSettings,
    ...session.imagePromptSettings,
  };
}

// handle data mapping for image generation settings matching sd api
function mapImageGenerationSettings(data) {
  const { numImages, negativePrompt, ...settings } = data;
  return {
    ...settings,
    batch_size: numImages,
    negative_prompt: negativePrompt,
  };
}

function handleReset() {
  llamaService.reset();
}

export default ReceiveActions;
