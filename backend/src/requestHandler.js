import { llamaService } from "./services/llamaService.js";
import { getImage } from "./services/sdService.js";
import { generateGUID } from "./utils/utils.js";
import { addRequest } from "./requestProcessor.js";
import { io } from "./socketServer.js";

const handleMessageReceived = async (socketId, data) => {
  switch (data.type) {
    case "text":
      addRequest(() => getLlamaResponse(data.message, socketId));
      break;
    case "image":
      addRequest(() => getImageResponse(data, socketId));
      break;
    default:
      break;
  }
};

const handleReset = async () => {
  llamaService.reset();
};

// Function to retrieve response from llamaService and send it to the specified socket
const getLlamaResponse = async (message, socketId) => {
  const responseGuid = generateGUID();
  let response = { username: "AI", content: [], guid: responseGuid };
  response.content.push({ data: "", type: "text" });
  io.to(socketId).emit("message", response);

  const onChunkReceived = (decodedChunk) => {
    io.to(socketId).emit("messageFragment", {
      data: decodedChunk,
      targetGuid: responseGuid,
    });
  };

  return await llamaService.prompt(message, true, onChunkReceived);
};

// Function to generate images based on the provided settings and send them to the specified socket
const getImageResponse = async (data, socketId) => {
  let response = { username: "AI", content: [] };

  // Match the names of variables in the settings with the names in the SD API
  const { numImages, negativePrompt, ...settings } = data.settings;
  const imagePrompt = {
    prompt: data.message,
    ...settings,
    batch_size: numImages,
    negative_prompt: negativePrompt,
  };

  const images = await getImage(imagePrompt);

  response.content.push({
    data: "here's generated content: ",
    type: "text",
  });

  images.forEach((image) => {
    response.content.push({ data: image, type: "image" });
  });

  io.to(socketId).emit("message", response);
};

export { handleMessageReceived, handleReset };
