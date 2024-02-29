import express from "express";

import {
  handleChatPrompt,
  handleGetLlamaModels,
  handleUpdateLlamaSettings,
  handleGetLlamaSettings,
} from "./controllers/llamaController.js";

import {
  handleImagePrompt,
  handleGetImageGenProgress,
  handleGetSDModels,
  handlePostOptions,
  handleGetOptions,
} from "./controllers/sdController.js";

const router = express.Router();

// Llama routes
router.get("/llamaModelList", handleGetLlamaModels);
router.get("/llamaSettings", handleGetLlamaSettings);
router.post("/updateLlamaSettings", handleUpdateLlamaSettings);
router.post("/ask", handleChatPrompt);

// SD routes
router.get("/sdModelList", handleGetSDModels);
router.get("/imageGenProgress", handleGetImageGenProgress);
router.post("/getImage", handleImagePrompt);
router.post("/sdOptions", handlePostOptions);
router.get("/sdOptions", handleGetOptions);

export { router };
