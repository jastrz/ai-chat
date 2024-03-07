import axios from "axios";
import path from "path";
import fsp from "fs/promises";

// const sdAddress = "http://127.0.0.1:7861/sdapi/v1";

let apiClient;
const defaultImagePrompt = {
  height: 512,
  width: 512,
  batch_size: 1,
};

export function initialize() {
  const sdAddress = process.env.SD_SERVER_ADDRESS;

  apiClient = axios.create({
    baseURL: sdAddress,
    timeout: 0,
  });
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
    return result.data.progress;
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

async function saveImageToFile(imageData, filename, finalPath) {
  try {
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const filepath = path.join(finalPath, filename);

    await fsp.writeFile(filepath, buffer);

    console.log("Image saved successfully:", filename);
  } catch (err) {
    console.error("Error saving image:", err.message);
    throw err;
  }
}

async function saveImages(imageData) {
  const promises = imageData.map(async (image) => {
    try {
      const filename = new Date().toISOString().replace(/[:.]/g, "-") + ".png";
      const finalPath = "C:\\projects\\llamatest\\backend\\public";
      await saveImageToFile(image, filename, finalPath);
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
  defaultImagePrompt,
};
