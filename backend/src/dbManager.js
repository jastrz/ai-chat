import Message from "./models/message.js";
import History from "./models/history.js";

export async function getNewHistoryId() {
  try {
    const history = await History.create({ messages: [] });
    if (history) {
      return history._id;
    }
  } catch (err) {
    console.log(err.message);
  }
}

export async function getMessages(historyId) {
  try {
    let history = await History.findById(historyId);
    if (!history) {
      return [];
    } else {
      return history.messages;
    }
  } catch (err) {
    console.log(err.message);
  }
}

export async function saveMessage(message, historyId) {
  const newMessage = await Message.create({
    username: message.username,
    content: message.content,
  });

  try {
    let history = await History.findById(historyId);
    if (history) {
      history.messages.push(newMessage);
      await history.save();
    } else {
      history = History.create({
        messages: [newMessage],
        _id: historyId,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
}
