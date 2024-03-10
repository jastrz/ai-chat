import api from "api/axiosConfig";

/**
 * Retrieves list of available SD models
 * @returns {Promise<object>} - The list of SD models
 */
async function getSDModelList() {
  try {
    const response = await api.get("/sdModelList");
    return response.data;
  } catch (error) {
    console.error("Error getting sd model list: ", error);
    throw error;
  }
}

/**
 * Retrieves list of available Llama models
 * @returns {Promise<object>} - The list of Llama models
 */
async function getLlamaModelList() {
  try {
    const response = await api.get("/llamaModelList");
    return response.data;
  } catch (error) {
    console.error("Error getting llama model list: ", error);
    throw error;
  }
}

/**
 * Retrieves current global Llama settings
 * @returns {Promise<object>} - The current Llama settings
 */
async function getCurrentLlamaSettings() {
  try {
    const response = await api.get("/llamaSettings");
    return response.data;
  } catch (error) {
    console.error("Error getting llama model list: ", error);
    throw error;
  }
}

/**
 * Updates global Llama settings with the provided data
 * @param {object} settings - The settings data to update
 * @returns {Promise<any>} - The response data from updating the settings
 */
async function updateLlamaSettings(settings) {
  try {
    const response = await api.post("/updateLlamaSettings", { data: settings });
    return response;
  } catch (error) {
    console.error("Error posting llama settings");
    throw error;
  }
}

/**
 * Updates global SD settings with the provided data
 * @param {object} settings - The settings data to update
 * @returns {Promise<any>} - The response data from updating the settings
 */
async function updateSdSettings(settings) {
  try {
    const response = await api.post("/sdOptions", { data: settings });
    console.log(settings);
    return response;
  } catch (error) {
    console.error("Error posting SD Settings");
    throw error;
  }
}

/**
 * Retrieves global SD settings
 * @returns {Promise<object>} - The SD settings data
 */
async function getSDSettings() {
  try {
    const response = await api.get("/sdOptions");
    return response.data;
  } catch (error) {
    console.log("Error getting SD options");
    throw error;
  }
}

/**
 * Retrieves the progress of the image generation process
 * @returns {Promise<number>} - The progress of the image generation (in percentage)
 *
 * Note: handling this should be moved to sockets
 */
async function getImageGenProgress() {
  try {
    const response = await api.get("/imageGenProgress");
    return response.data.progress * 100;
  } catch (error) {
    console.error("Error getting progress: ", error);
    throw error;
  }
}

/**
 * @Unused - sockets are used for prompts
 * Prompts a question to the API and returns the answer
 * @param {string} prompt - The question prompt to send to the API
 * @returns {Promise<string>} - The answer to the question
 */
async function prompt(prompt) {
  try {
    const response = await api.post("/ask", { prompt });
    return response.data.answer;
  } catch (error) {
    console.error("Error asking question:", error);
    throw error;
  }
}

/**
 * @Unused - sockets are used for prompts
 * Sends a request for an image with the provided data
 * @param {object} requestData - The data to send for requesting an image
 * @returns {Promise<object>} - The response data containing the image
 */
async function askForImage(requestData) {
  try {
    const response = await api.post("/getImage", requestData);
    return response.data;
  } catch (error) {
    console.error("Error asking for image: ", error);
    throw error;
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
