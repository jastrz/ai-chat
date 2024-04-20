/**
 * Handles actions received from client through socket
 * @module ReceiveActions
 */

import * as sessionManager from "../session/sessionManager.js";
import { llamaService } from "../../services/llamaService.js";
import { processPrompt } from "../promptRequests/requestHandler.js";
import { SendActions } from "./sendActions.js";
import * as validators from "./receiveActionsValidators.js";
import * as db from "../../db.js";
import { cancelRequest } from "../promptRequests/requestProcessor.js";
import { generateGUID } from "../../utils/utils.js";

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

/**
 * Handle the user connection initialization. Assigns user to session.
 * @param {string} socketId - The socket ID of the connected user.
 * @param {Object} data - The data associated with the user connection.
 */
async function handleUserConnected(socketId, data) {
  await sessionManager.handleUserConnected(socketId, data);
}

/**
 * Handle the user disconnection.
 * @param {string} socketId - The socket ID of the disconnected user.
 * @param {Object} data - unused
 */
function handleUserDisconnected(socketId, data) {
  console.log(`user disconnected: ${socketId}`);
  sessionManager.handleUserDisconnected(socketId);
}

/**
 * Handle the received prompt data.
 * @param {string} socketId - The socket ID of the user who sent the prompt.
 * @param {Object} data - The prompt data received from the user.
 */
async function handlePromptReceived(socketId, data) {
  const prompt = data;
  console.log(prompt);

  const { error } = validators.promptSchema.validate(prompt);
  if (error) throw new Error(error);

  const session = sessionManager.getSessionBySocketId(socketId);

  if (prompt.historyId && prompt.historyId != "") {
    session.historyId = prompt.historyId;
  }

  let existingMessage = await db.getMessage(prompt.guid);
  if (!existingMessage) {
    const userMessage = {
      username: session.username,
      content: [{ data: prompt.message, type: "text" }],
      prompt: {
        status: prompt.status,
        type: prompt.type,
        targetGuid: prompt.targetGuid || generateGUID(),
      },
    };

    const { history, message } = await db.saveMessage(userMessage, session);

    prompt.guid = message._id.toString();
    userMessage.guid = prompt.guid;
    userMessage.promptGuid = prompt.guid;

    session.broadcast(SendActions.Message, userMessage);
    session.broadcast(SendActions.SetHistory, {
      _id: history._id.toString(),
      timestamp: history.timestamp,
    });
  }

  await processPrompt(session, prompt);
}

/**
 * Handle canceling a prompt request.
 * @param {string} socketId - The socket ID of the user requesting to cancel the prompt.
 * @param {Object} data - id of prompt to be cancelled
 */
async function handleCancelPrompt(socketId, data) {
  await cancelRequest(data);
}

/**
 * Handle the text generation settings received from the user.
 * @param {string} socketId - The socket ID of the user sending text generation settings.
 * @param {Object} data - The text generation settings data.
 */
function handleTextGenerationSettings(socketId, data) {
  const { error } = validators.textPromptSettingsSchema.validate(data);
  if (error) throw new Error(error);

  const session = sessionManager.getSessionBySocketId(socketId);
  session.textPromptSettings = { ...session.textPromptSettings, ...data };
}

/**
 * Handle the image generation settings received from the user.
 * @param {string} socketId - The socket ID of the user sending image generation settings.
 * @param {Object} data - The image generation settings data.
 */
function handleImageGenerationSettings(socketId, data) {
  const { error } = validators.imageGenPromptSettingsSchema.validate(data);
  if (error) throw new Error(error);

  const session = sessionManager.getSessionBySocketId(socketId);
  const imageGenSettings = mapImageGenerationSettings(data);

  session.imagePromptSettings = {
    ...session.imagePromptSettings,
    ...imageGenSettings,
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

/**
 * Handle resetting chat
 * @param {string} socketId - The socket ID of the user whose session is being reset.
 * @param {Object} data - The data associated with the session reset.
 */
function handleReset(socketId, data) {
  const session = sessionManager.getSessionBySocketId(socketId);
  session.historyId = undefined;
  llamaService.reset();
}

export default ReceiveActions;
