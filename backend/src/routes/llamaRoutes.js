import express from "express";

import {
  handleChatPrompt,
  handleGetLlamaModels,
  handleUpdateLlamaSettings,
  handleGetLlamaSettings,
} from "../controllers/llamaController.js";

const router = express.Router();

// Llama routes
/**
 * @swagger
 * /llama/modelList:
 *   get:
 *     summary: Retrieve a list of available models for llama cpp
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/modelList", handleGetLlamaModels);

/**
 * @swagger
 * /llama/settings:
 *   get:
 *     summary: Get llama settings
 *     description: Retrieve llama settings
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get("/settings", handleGetLlamaSettings);

/**
 * @swagger
 * /llama/updateSettings:
 *   post:
 *     summary: Update llama settings
 *     description: Update llama settings
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/updateSettings", handleUpdateLlamaSettings);

/**
 * @swagger
 * /llama/ask:
 *   post:
 *     summary: Prompt llama to chat
 *     description: Prompt llama to start a conversation
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/ask", handleChatPrompt);

export { router };
