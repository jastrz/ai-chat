import { llamaService } from "../../services/llamaService.js";
import { getImage } from "../../services/sdService.js";
import { addRequest, stateChangeEventEmitter } from "./requestProcessor.js";
import { Request, RequestStatus } from "./request.js";
import { getSessionById } from "../session/sessionManager.js";
import { SendActions } from "../actions/sendActions.js";
import * as db from "../../db.js";
import { handleInterrupt } from "../../controllers/sdController.js";

// Processes a prompt based on its type
// Probably should process only text prompts
export async function processPrompt(session, data) {
  let request;

  switch (data.type) {
    case "text":
      const controller = new AbortController();
      const signal = controller.signal;

      request = new Request(
        data.guid,
        session.id,
        async () => getLlamaResponse(data, session, signal),
        async () => onLlamaRequestStopped(controller)
      );
      break;

    case "image":
      request = new Request(
        data.guid,
        session.id,
        async () => getImageResponse(data, session),
        async () => onImageRequestStopped()
      );
      break;

    default:
      break;
  }

  addRequest(request);
}

// Listens for changes in request state and updates the prompt state
stateChangeEventEmitter.on("onRequestStateChange", (request) => {
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
});

// Function to retrieve response from llamaService and send it to the specified socket
async function getLlamaResponse(userPrompt, session, abortSignal) {
  const onChunkReceived = (decodedChunk) => {
    const messageFragment = {
      promptGuid: userPrompt.guid,
      targetGuid: userPrompt.targetGuid,
      data: decodedChunk,
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
    await saveAiMessage(content, session);
  }
}

async function onLlamaRequestStopped(controller) {
  controller.abort();
}

// Function to generate images based on the provided settings and send them to the specified socket
async function getImageResponse(userPrompt, session) {
  let response = { username: "AI", content: [] };

  console.log(userPrompt);

  const imagePrompt = {
    prompt: userPrompt.message,
    ...session.imagePromptSettings,
  };

  const images = await getImage(imagePrompt);

  response.content.push({
    data: "here's generated content: ",
    type: "text",
  });

  images.forEach((image) => {
    response.content.push({ data: image, type: "image" });
  });

  await saveAiMessage(response.content, session);
  session.broadcast(SendActions.Message, response);
}

async function onImageRequestStopped() {
  await handleInterrupt();
}

async function saveAiMessage(content, session) {
  const message = {
    username: "AI",
    content: content,
  };
  await db.saveMessage(message, session);
}
