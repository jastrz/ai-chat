import * as sessionManager from "../session/sessionManager.js";
import { llamaService } from "../../services/llamaService.js";
import { processPrompt } from "../promptRequests/requestHandler.js";
import { SendActions } from "./sendActions.js";
import * as validators from "./receiveActionsValidators.js";
import * as dbManager from "../../dbManager.js";

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

async function handleUserConnected(socketId, data) {
  await sessionManager.handleUserConnected(socketId, data);
  // const session = sessionManager.getSessionBySocketId(socketId);

  // if (session.historyId === undefined) {
  //   const user = await dbManager.getUser(session.username);
  //   const id = await dbManager.getNewHistoryId(user._id);
  //   session.historyId = id;
  //   console.log(session.historyId);
  // }
}

function handleUserDisconnected(socketId, data) {
  console.log(`user disconnected: ${socketId}`);
  sessionManager.handleUserDisconnected(socketId);
}

async function handlePromptReceived(socketId, data) {
  const { error } = validators.promptSchema.validate(data);
  if (error) throw new Error(error);

  const session = sessionManager.getSessionBySocketId(socketId);
  const userMessage = {
    username: session.username,
    content: [{ data: data.message, type: "text" }],
  };

  console.log(session.historyId);

  await dbManager.saveMessage(userMessage, session);

  // send message to other sockets associated with currently processed request
  session.broadcast(SendActions.Message, userMessage, [socketId]);
  await processPrompt(session, data);
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

function handleReset(socketId, data) {
  const session = sessionManager.getSessionBySocketId(socketId);
  session.historyId = undefined;
  llamaService.reset();
}

export default ReceiveActions;
