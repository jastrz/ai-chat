import express from "express";
import {
  handleImagePrompt,
  handleGetImageGenProgress,
  handleGetSDModels,
  handlePostOptions,
  handleGetOptions,
} from "../controllers/sdController.js";

const router = express.Router();

/**
 * @swagger
 * /sd/modelList:
 *   get:
 *     summary: Get list of models
 *     description: Retrieves a list of models available for image generation.
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/modelList", handleGetSDModels);

/**
 * @swagger
 * /sd/imageGenProgress:
 *   get:
 *     summary: Get image generation progress
 *     description: Retrieves the progress of image generation.
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/imageGenProgress", handleGetImageGenProgress);

/**
 * @swagger
 * /sd/getImage:
 *   post:
 *     summary: Prompt for image generation
 *     description: Prompt for generating a new image.
 */
router.post("/getImage", handleImagePrompt);

/**
 * @swagger
 * /sd/options:
 *   post:
 *     summary: Set options for image generation
 *     description: Set options for generating a new image.
 */
router.post("/options", handlePostOptions);

/**
 * @swagger
 * /sd/options:
 *   get:
 *     summary: Get options for image generation
 *     description: Retrieves the options set for image generation.
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/options", handleGetOptions);

export { router };
