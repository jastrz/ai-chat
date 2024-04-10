/**
 * History module for handling history-related operations.
 * @module History
 */

import * as db from "../db.js";

/**
 * Handle the retrieval of the history list for a specific user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const handleGetHistoryList = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await db.getUser(username);
    if (user) {
      const histories = await db.getHistoryList(user._id);
      res.json(histories);
    } else {
      res.status(200).json("Couldn't find user");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

/**
 * Handle the retrieval of a specific history record by history Id.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const handleGetHistory = async (req, res) => {
  try {
    const historyId = req.params.historyId;
    const history = await db.getHistory(historyId);
    return res.json(history);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

/**
 * Handle the removal of a specific history record by history Id.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const handleRemoveHistory = async (req, res) => {
  try {
    const historyId = req.params.historyId;
    const result = await db.removeHistory(historyId);
    return res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
