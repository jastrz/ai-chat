import axios from "axios";
import path from "path";
import fsp from "fs/promises";

// const sdAddress = process.env.SD_SERVER_ADDRESS;
const sdAddress = "http://127.0.0.1:7861/sdapi/v1";
const apiClient = axios.create({
  baseURL: sdAddress,
  timeout: 0,
});

const defaultImagePrompt = {
  height: 512,
  width: 512,
  batch_size: 1,
};

const getImage = async (prompt) => {
  console.log(prompt);
  const result = await apiClient.post(sdAddress + "/txt2img", prompt);

  if (process.env.CACHE_GENERATED_IMAGES.toLowerCase() === "true") {
    saveImages(result.data.images);
  }

  return result.data.images;
};

const getProgress = async () => {
  const result = await apiClient.get(sdAddress + "/progress");

  // possibly send currently generated image to client instead of plain progress
  // console.log(result.data);

  return result.data.progress;
};

const postOptions = async (options) => {
  try {
    const mappedOptions = {
      sd_model_checkpoint: options.modelName,
    };
    const result = await apiClient.post(sdAddress + "/options", mappedOptions);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const getModelList = async () => {
  try {
    const result = await apiClient.get(sdAddress + "/sd-models");
    return result;
  } catch (error) {
    console.error("Error getting models:", error);
    return null;
  }
};

const getOptions = async () => {
  try {
    const result = await apiClient.get(sdAddress + "/options");
    return result.data;
  } catch (error) {
    console.error("Error getting options:", error);
    return null;
  }
};

const saveImageToFile = async (imageData, filename, finalPath) => {
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
};

const saveImages = async (imageData) => {
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
};

export {
  getImage,
  getProgress,
  getModelList,
  postOptions,
  getOptions,
  defaultImagePrompt,
};
