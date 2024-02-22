import path from "path";
import { fileURLToPath } from "url";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";
import fs from "fs";

/* Handles llama model loading and inference, with methods
  for initialization, user prompts, setting models, and managing
  sessions. The singleton instance is exported as llamaService. */
class LlamaService {
  sessions = [];
  model;
  initialized = false;
  availableModels = [];

  contextSettings = {
    modelName: "",
    model: null,
    contextSize: 2048,
    batchSize: 256,
    threads: 12,
  };

  gpuSettings = {
    gpuLayers: 32,
  };

  constructor() {
    this.init();
  }

  async init() {
    try {
      await this.getAvailableModels();
      const index = Math.floor(Math.random() * this.availableModels.length);
      this.contextSettings.modelName = this.availableModels[index];
      console.log(`Selected model: ${this.contextSettings.modelName}`);
    } catch (error) {
      console.log(error);
    }
  }

  async prompt(input) {
    // initialization is temporarily here to prevent model loading on settings change
    if (!this.initialized) {
      this.sessions = [];
      this.setModel(this.contextSettings.modelName);
      const context = new LlamaContext(this.contextSettings);
      this.sessions.push(new LlamaChatSession({ context }));
    }
    console.log("user: " + input);
    const answer = await this.getSession().prompt(input);

    return answer;
  }

  updateContextSettings(newSettings) {
    this.contextSettings.batchSize = parseInt(newSettings.batchSize);
    this.contextSettings.contextSize = parseInt(newSettings.contextSize);
    this.contextSettings.modelName = newSettings.modelName;

    this.initialized = false;
  }

  getAvailableModels = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const directoryPath = path.join(__dirname, "../../models");

    try {
      const files = await fs.promises.readdir(directoryPath);

      // Filter out only the file names
      const availableModels = await Promise.all(
        files.map(async (file) => {
          const stats = await fs.promises.stat(`${directoryPath}/${file}`);
          if (stats.isFile()) {
            return file;
          }
          return null;
        })
      );

      this.availableModels = availableModels.filter((model) => model !== null);

      // Filter out any null values (non-file items)
      return this.availableModels;
    } catch (error) {
      console.error("Error while reading directory:", error);
      return [];
    }
  };

  setModel = (modelName, gpuLayers = this.gpuSettings.gpuLayers) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    delete this.contextSettings.model;
    this.contextSettings.model = new LlamaModel({
      modelPath: path.join(__dirname, "../../models", modelName),
      gpuLayers: gpuLayers,
    });
    console.log(`Setting model: ${modelName}`);
  };

  // session per user not implemented yet
  getSession = () => {
    return this.sessions[this.sessions.length - 1];
  };

  reset = async () => {
    console.log("resetting");
    this.initialized = false;
    this.sessions = [];
  };
}

const llamaService = new LlamaService();

export { llamaService };
