import axios from "axios";
import path from "path";
import fsp from "fs/promises";
import net from "net";

// const sdAddress = "http://127.0.0.1:7861/sdapi/v1";

let apiClient;
const defaultImagePrompt = {
  height: 512,
  width: 512,
  batch_size: 1,
};

const defaultOptions = {
  show_progress_every_n_steps: 1,
};

const waitForPort = async (host, port) => {
  let connected = false;
  while (!connected) {
    const client = new net.Socket();

    client.connect({ port: port, host: host }, () => {
      console.log("SD available!");
      connected = true;
      client.destroy();
    });

    client.on("error", function (ex) {
      client.destroy();
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

export async function initialize() {
  const sdAddress = process.env.SD_SERVER_ADDRESS;
  const sdPort = process.env.SD_SERVER_PORT;
  const sdApiAddress = `http://${sdAddress}:${sdPort}${process.env.SD_SERVER_API}`;

  apiClient = axios.create({
    baseURL: sdApiAddress,
    timeout: 0,
  });

  await waitForPort(sdAddress, sdPort);
  await apiClient.post("/options", defaultOptions);
  const options = await apiClient.get("/options");
  console.log(options);
}

async function getImage(prompt) {
  try {
    console.log(prompt);
    const result = await apiClient.post("/txt2img", prompt);

    if (process.env.CACHE_GENERATED_IMAGES.toLowerCase() === "true") {
      saveImages(result.data.images);
    }
    return result.data.images;
  } catch (error) {
    console.error("Error getting image:", error);
    throw error;
  }
}

async function getProgress() {
  try {
    const result = await apiClient.get("/progress");
    return result.data;
  } catch (error) {
    console.error("Error getting progress:", error);
    throw error;
  }
}

async function postOptions(options) {
  try {
    const mappedOptions = {
      sd_model_checkpoint: options.modelName,
    };
    const result = await apiClient.post("/options", mappedOptions);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getModelList() {
  try {
    const result = await apiClient.get("/sd-models");
    return result;
  } catch (error) {
    console.error("Error getting models:", error);
    return null;
  }
}

async function getOptions() {
  try {
    const result = await apiClient.get("/options");
    return result.data;
  } catch (error) {
    console.error("Error getting options:", error);
    return null;
  }
}

async function interruptCurrentRequest() {
  try {
    const result = await apiClient.post("/interrupt");
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error interrupting sd request:", error);
    throw error;
  }
}

async function saveImageToFile(imageData, filename, finalPath) {
  try {
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const filepath = path.join(finalPath, filename);

    await fsp.writeFile(filepath, buffer);

    console.log("Image saved successfully:", filename);
  } catch (error) {
    console.error("Error saving image:", err.message);
    throw error;
  }
}

async function saveImages(imageData) {
  const promises = imageData.map(async (image) => {
    try {
      const filename = new Date().toISOString().replace(/[:.]/g, "-") + ".png";
      const savePath = process.env.IMAGE_SAVE_PATH;
      await saveImageToFile(image, filename, savePath);
    } catch (error) {
      console.log("Error processing image:", error);
    }
  });

  await Promise.all(promises);
}

export {
  getImage,
  getProgress,
  getModelList,
  postOptions,
  getOptions,
  interruptCurrentRequest,
  defaultImagePrompt,
};
