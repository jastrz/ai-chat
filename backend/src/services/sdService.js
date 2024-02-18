import axios from "axios";
import path from "path";
import fsp from "fs/promises";

const sdUrl = "http://127.0.0.1:7861/sdapi/v1/txt2img";
const apiClient = axios.create({
  baseURL: sdUrl,
  timeout: 0,
});

const getImage = async (prompt) => {
  const result = await apiClient.post(sdUrl, prompt);

  if (process.env.CACHE_GENERATED_IMAGES.toLowerCase() === "true") {
    saveImages(result.data.images);
  }

  return result.data.images;
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

  // Use Promise.all without await to run them in parallel
  await Promise.all(promises);
};

export { getImage };
