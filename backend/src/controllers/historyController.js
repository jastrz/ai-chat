import * as dbManager from "../dbManager.js";

export const handleGetHistoryList = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await dbManager.getUser(username);
    if (user) {
      const histories = await dbManager.getHistoryList(user._id);

      res.json(histories);
    } else {
      res.status(200).json("Couldn't find user");
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

export const handleGetHistory = async (req, res) => {
  try {
    const historyId = req.params.historyId;
    const history = await dbManager.getHistory(historyId);
    return res.json(history);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

export const handleRemoveHistory = async (req, res) => {
  try {
    const historyId = req.params.historyId;
    const result = await dbManager.removeHistory(historyId);
    return res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
