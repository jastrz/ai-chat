import { llamaService } from "../services/llamaService.js";
import { getImage } from "../services/sdService.js";
import { Request, addRequest, eventEmitter } from "./requestProcessor.js";
import { getSessionById } from "../session/sessionManager.js";
import { RequestStatus, SendActions } from "../socketServer.js";

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

const processPrompt = async (session, data) => {
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
};

// Function to retrieve response from llamaService and send it to the specified socket
const getLlamaResponse = async (userPrompt, session) => {
  const onChunkReceived = (decodedChunk) => {
    const responseFragment = {
      promptGuid: userPrompt.guid,
      targetGuid: userPrompt.targetGuid,
      data: decodedChunk,
    };

    session.broadcast(SendActions.MessageFragment, responseFragment);
  };

  const prompt = {
    message: userPrompt.message,
    settings: session.textPromptSettings,
  };

  return await llamaService.prompt(prompt, true, onChunkReceived);
};

// Function to generate images based on the provided settings and send them to the specified socket
const getImageResponse = async (userPrompt, session) => {
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
};

export { processPrompt };
