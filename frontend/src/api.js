import axios from "axios";

const baseURL = "http://192.168.0.27:3001"; // Change this to match your server's address

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const prompt = async (prompt) => {
  try {
    const response = await api.post("/ask", { prompt });
    return response.data.answer;
  } catch (error) {
    console.error("Error asking question:", error);
    throw error;
  }
};

const askForImage = async (requestData) => {
  try {
    const response = await api.post("/getImage", requestData);
    return response.data;
  } catch (error) {
    console.error("Error asking for image: ", error);
    throw error;
  }
};

const getImageGenProgress = async () => {
  try {
    const response = await api.get("/imageGenProgress");
    return response.data.progress * 100;
  } catch (error) {
    console.error("Error getting progress: ", error);
    throw error;
  }
};

const getSDModelList = async () => {
  try {
    const response = await api.get("/sdModelList");
    return response.data;
  } catch (error) {
    console.error("Error getting sd model list: ", error);
    throw error;
  }
};

const getLlamaModelList = async () => {
  try {
    const response = await api.get("/llamaModelList");
    return response.data;
  } catch (error) {
    console.error("Error getting llama model list: ", error);
    throw error;
  }
};

const getCurrentLlamaSettings = async () => {
  try {
    const response = await api.get("/llamaSettings");
    return response.data;
  } catch (error) {
    console.error("Error getting llama model list: ", error);
    throw error;
  }
};

const updateLlamaSettings = async (settings) => {
  try {
    const response = await api.post("/updateLlamaSettings", { data: settings });
    return response;
  } catch (error) {
    console.error("Error setting llama model");
    throw error;
  }
};

export {
  prompt,
  askForImage,
  getImageGenProgress,
  getSDModelList,
  getLlamaModelList,
  updateLlamaSettings,
  getCurrentLlamaSettings,
};
