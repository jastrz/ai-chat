import express from "express";

import { handleChatPrompt } from "./controllers/llamaController.js";
import { handleImagePrompt } from "./controllers/sdController.js";

const router = express.Router();

router.post("/ask", handleChatPrompt);
router.post("/getImage", handleImagePrompt);

export { router };
