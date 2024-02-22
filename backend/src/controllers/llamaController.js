import { llamaService } from "../services/llamaService.js";

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
