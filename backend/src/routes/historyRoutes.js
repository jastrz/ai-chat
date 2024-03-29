import express from "express";

import {
  handleGetHistory,
  handleGetHistoryList,
  handleRemoveHistory,
} from "../controllers/historyController.js";

import verifyToken from "../middleware/auth.js";

const router = express.Router();

// History routes

/**
 * @swagger
 * /history/list/{username}:
 *   get:
 *     summary: Get list of history for a specific user
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized
 */
router.get("/list/:username", verifyToken, handleGetHistoryList);

/**
 * @swagger
 * /history/{historyId}:
 *   get:
 *     summary: Get history by ID
 *     parameters:
 *       - in: path
 *         name: historyId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the history
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized
 */
router.get("/:historyId", verifyToken, handleGetHistory);

/**
 * @swagger
 * /history/{historyId}:
 *   delete:
 *     summary: Delete history by ID
 *     parameters:
 *       - in: path
 *         name: historyId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the history
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized
 */
router.delete("/:historyId", verifyToken, handleRemoveHistory);

export { router };
