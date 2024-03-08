import { llamaService } from "../../services/llamaService.js";
import { getImage } from "../../services/sdService.js";
import { addRequest, eventEmitter } from "./requestProcessor.js";
import { Request, RequestStatus } from "./request.js";
import { getSessionById } from "../session/sessionManager.js";
import { SendActions } from "../actions/sendActions.js";
import * as dbManager from "../../dbManager.js";

// Processes a prompt based on its type
// Probably should process only text prompts
export async function processPrompt(session, data) {
  let request;

  switch (data.type) {
    case "text":
      request = new Request(data.guid, session.id, async () =>
        getLlamaResponse(data, session)
      );
      break;

    case "image":
      request = new Request(data.guid, session.id, async () =>
        getImageResponse(data, session)
      );
      break;

    default:
      break;
  }

  addRequest(request);
}

// Listens for changes in request state and updates the prompt state
eventEmitter.on("onRequestStateChange", (request) => {
  console.log(`Request: ${request.id} state changed: ${request.status}`);

  if (
    request.status === RequestStatus.Processed ||
    request.status === RequestStatus.Completed
  ) {
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
async function getLlamaResponse(userPrompt, session) {
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

  const answer = await llamaService.prompt(prompt, true, onChunkReceived);

  const message = {
    username: "AI",
    content: [{ type: "text", data: answer }],
  };
  await dbManager.saveMessage(message, session.historyId);

  return answer;
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

  session.broadcast(SendActions.Message, response);
}
