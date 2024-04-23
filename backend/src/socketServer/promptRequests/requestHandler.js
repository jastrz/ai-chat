import { llamaService } from "../../services/llamaService.js";
import { getImage } from "../../services/sdService.js";
import {
  RequestProcessorEvents,
  requestProcessor,
} from "./requestProcessor.js";
import { Request, RequestStatus } from "./request.js";
import { getSessionById } from "../session/sessionManager.js";
import { SendActions } from "../actions/sendActions.js";
import * as db from "../../db.js";
import { handleInterrupt } from "../../controllers/sdController.js";
import { getProgress } from "../../services/sdService.js";

// Processes a prompt based on its type
// Probably should process only text prompts
export async function processPrompt(session, prompt) {
  let request;

  switch (prompt.type) {
    case "text":
      const controller = new AbortController();
      const signal = controller.signal;

      request = new Request(
        prompt.guid,
        session.id,
        async () => getLlamaResponse(prompt, session, signal),
        async () => onLlamaRequestStopped(controller)
      );
      break;

    case "image":
      request = new Request(
        prompt.guid,
        session.id,
        async () => getImageResponse(prompt, session),
        async () => onImageRequestStopped()
      );
      break;

    default:
      break;
  }

  requestProcessor.addRequest(request);
}

// Listens for changes in request state and updates the prompt state
requestProcessor.stateChangeEventEmitter.on(
  RequestProcessorEvents.RequestStateChanged,
  (request) => {
    console.log(`Request: ${request.id} state changed: ${request.status}`);

    if (request.status !== RequestStatus.Pending) {
      try {
        const session = getSessionById(request.sessionId);
        session.broadcast(SendActions.UpdatePromptState, {
          guid: request.id,
          status: request.status,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
);

// Function to retrieve response from llamaService and send it to the specified socket
async function getLlamaResponse(userPrompt, session, abortSignal) {
  const onChunkReceived = (decodedChunk) => {
    const messageFragment = {
      targetGuid: userPrompt.targetGuid,
      content: [{ data: decodedChunk, type: "text", updateType: "aggregate" }],
    };

    session.broadcast(SendActions.MessageFragment, messageFragment);
  };

  const prompt = {
    message: userPrompt.message,
    settings: session.textPromptSettings,
  };

  const answer = await llamaService.prompt(
    prompt,
    true,
    onChunkReceived,
    abortSignal
  );

  if (answer) {
    const content = [{ type: "text", data: answer }];
    await saveAiMessage(content, session, userPrompt.guid);
  }
}

async function onLlamaRequestStopped(controller) {
  controller.abort();
}

// Function to generate images based on the provided settings and send them to the specified socket
async function getImageResponse(userPrompt, session) {
  console.log(userPrompt);

  const imagePrompt = {
    prompt: userPrompt.message,
    ...session.imagePromptSettings,
  };

  let images, progress, currentPreview, intervalId;

  const repeatedProgressCall = new Promise((resolve, reject) => {
    intervalId = setInterval(async () => {
      progress = await getProgress();

      if (progress.current_image && progress.current_image !== currentPreview) {
        currentPreview = progress.current_image;
        const progressBar = getProgressBarString(progress.progress);

        const content = [
          {
            data: `${progressBar} ${[parseInt(progress.progress * 100)]}%`,
            type: "text",
            updateType: "replace",
          },
          {
            data: currentPreview,
            type: "image",
            updateType: "replace",
          },
        ];

        const messageFragment = {
          targetGuid: userPrompt.targetGuid,
          content: content,
        };

        session.broadcast(SendActions.MessageFragment, messageFragment);
      }
    }, 500);
  });

  images = await Promise.race([getImage(imagePrompt), repeatedProgressCall]);

  clearInterval(intervalId);

  const response = getImageMessage(images);
  response.messageTarget = userPrompt.guid;
  const message = await saveAiMessage(
    response.content,
    session,
    userPrompt.guid
  );
  response.guid = message._id.toString();
  session.broadcast(SendActions.Message, response);
}

function getProgressBarString(progress) {
  let completed = Math.round(progress * 10);
  let remaining = 10 - completed;
  return `[${"|".repeat(completed)}${" ".repeat(remaining)}]`;
}

function getImageMessage(images) {
  let response = { username: "AI", content: [] };
  response.content.push({
    data: "here's generated content: ",
    type: "text",
  });

  images.forEach((image) => {
    response.content.push({ data: image, type: "image" });
  });
  return response;
}

async function onImageRequestStopped() {
  await handleInterrupt();
}

async function saveAiMessage(content, session, target = null) {
  const messageToSave = {
    username: "AI",
    content: content,
  };

  const { history, message } = await db.saveMessage(messageToSave, session);
  if (target) {
    const targetMessage = await db.getMessage(target);
    if (targetMessage) {
      targetMessage.responses.push(message._id);
      await db.updateMessage(targetMessage);
    }
  }
  session.broadcast(SendActions.SetHistory, {
    _id: history._id.toString(),
    timestamp: history.timestamp,
  });

  return message;
}
