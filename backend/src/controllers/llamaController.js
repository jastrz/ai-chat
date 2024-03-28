/**
 * Llama module
 * @module Llama
 */

import { llamaService } from "../services/llamaService.js";

/**
 * Handle chat prompts and generate answers based on the provided prompt.
 * @param {Object} req - The request object containing the prompt in the request body.
 * @param {Object} res - The response object to send back the generated answer.
 * @note - shouldn't be accessible to user
 */
const handleChatPrompt = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res
        .status(400)
        .json({ error: "Missing 'prompt' property in the request body!" });
    }

    const answer = await llamaService.prompt(prompt);

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Handle the retrieval of available llama models.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back the list of available models.
 */
const handleGetLlamaModels = async (req, res) => {
  try {
    const models = await llamaService.getAvailableModels();
    console.log(models);
    res.send(models);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting llama model list" });
  }
};

/**
 * Handle the retrieval of llama context settings.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back the current llama context settings.
 */
const handleGetLlamaSettings = async (req, res) => {
  try {
    const currentSettings = llamaService.contextSettings;
    const settings = {
      modelName: currentSettings.modelName,
      batchSize: currentSettings.batchSize,
      contextSize: currentSettings.contextSize,
    };
    res.send(settings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting llama context settings" });
  }
};

/**
 * Handle updating llama context settings.
 * @param {Object} req - The request object containing the updated settings data in the request body.
 * @param {Object} res - The response object to send back the status of the settings update.
 */
const handleUpdateLlamaSettings = async (req, res) => {
  try {
    const settings = req.body.data;
    await llamaService.updateContextSettings(settings);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error setting llama context settings" });
  }
};

/**
 * Handle resetting llama service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const handleReset = async (req, res) => {
  await llamaService.reset();
};

export {
  handleChatPrompt,
  handleGetLlamaModels,
  handleUpdateLlamaSettings,
  handleReset,
  handleGetLlamaSettings,
};
