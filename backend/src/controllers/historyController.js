import * as dbManager from "../dbManager.js";

export const handleGetHistoryList = async (req, res) => {
  try {
    console.log(req.body);
    const { username } = req.body;

    console.log("Getting username", username);

    const user = await dbManager.getUser(username);
    if (user) {
      const histories = await dbManager.getHistoryList(user._id);

      res.json(histories);
    } else {
      res.status(200).json("Couldn't find user");
    }
  } catch (err) {
    console.log(err);
    res.status(200);
  }
};

export const handleGetHistory = async (req, res) => {
  try {
    const { username, historyId } = req.body;
    const history = await dbManager.getHistory(historyId);
    return res.json(history);
  } catch (err) {
    console.log(err);
  }
};
