import api from "axiosConfig";

async function prompt(prompt) {
  try {
    const response = await api.post("/ask", { prompt });
    return response.data.answer;
  } catch (error) {
    console.error("Error asking question:", error);
    throw error;
  }
}

async function askForImage(requestData) {
  try {
    const response = await api.post("/getImage", requestData);
    return response.data;
  } catch (error) {
    console.error("Error asking for image: ", error);
    throw error;
  }
}

async function getImageGenProgress() {
  try {
    const response = await api.get("/imageGenProgress");
    return response.data.progress * 100;
  } catch (error) {
    console.error("Error getting progress: ", error);
    throw error;
  }
}

async function getSDModelList() {
  try {
    const response = await api.get("/sdModelList");
    return response.data;
  } catch (error) {
    console.error("Error getting sd model list: ", error);
    throw error;
  }
}

async function getLlamaModelList() {
  try {
    const response = await api.get("/llamaModelList");
    return response.data;
  } catch (error) {
    console.error("Error getting llama model list: ", error);
    throw error;
  }
}

async function getCurrentLlamaSettings() {
  try {
    const response = await api.get("/llamaSettings");
    return response.data;
  } catch (error) {
    console.error("Error getting llama model list: ", error);
    throw error;
  }
}

async function updateLlamaSettings(settings) {
  try {
    const response = await api.post("/updateLlamaSettings", { data: settings });
    return response;
  } catch (error) {
    console.error("Error posting llama settings");
    throw error;
  }
}

async function updateSdSettings(settings) {
  try {
    const response = await api.post("/sdOptions", { data: settings });
    console.log(settings);
    return response;
  } catch {
    console.error("Error posting SD Settings");
  }
}

async function getSDSettings() {
  try {
    const response = await api.get("/sdOptions");
    return response.data;
  } catch {
    console.log("Error getting SD options");
  }
}



export {
  prompt,
  askForImage,
  getImageGenProgress,
  getSDModelList,
  getSDSettings,
  getLlamaModelList,
  updateLlamaSettings,
  getCurrentLlamaSettings,
  updateSdSettings,
};
