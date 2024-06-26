import Message from "./models/message.js";
import History from "./models/history.js";
import User from "./models/user.js";

import mongoose from "mongoose";

export async function getUser(username) {
  try {
    let user = await User.findOne({ username });
    return user;
  } catch (error) {
    console.error("Error fetching user: ", error);
    return null;
  }
}

export async function getHistoryList(userId) {
  try {
    const histories = await History.find({ userId }, { _id: 1, timestamp: 1 });

    return histories;
  } catch (error) {
    console.error("Error while fetching histories:", error);
    return null;
  }
}

export async function getHistory(historyId) {
  try {
    const history = await History.findById(historyId).populate("messages");
    return history;
  } catch (err) {
    console.error("Error getting history", err);
  }
}

export async function getMessage(messageId) {
  const isValidMessageId = mongoose.Types.ObjectId.isValid(messageId);
  if (!isValidMessageId) return undefined;

  try {
    const message = await Message.findById(messageId);
    return message;
  } catch (err) {
    console.error("Error getting message", err);
    return undefined;
  }
}

export async function updateMessage(message) {
  try {
    const messageToUpdate = await Message.findById(message._id);

    if (!messageToUpdate) {
      console.error("Message not found");
      return null;
    }

    Object.assign(messageToUpdate, message);
    const updatedMessage = await messageToUpdate.save();
    return updatedMessage;
  } catch (err) {
    console.error("Error updating message:", err);
    throw err;
  }
}

export async function saveMessage(message, session) {
  const newMessage = await Message.create(message);

  try {
    let history = await History.findById(session.historyId);
    if (history) {
      history.messages.push(newMessage);
      history.timestamp = new Date();
      await history.save();
    } else {
      history = await createNewHistory(newMessage, session);
    }

    return { history, message: newMessage };
  } catch (err) {
    console.log(err.message);
  }
}

export async function removeHistory(historyId) {
  try {
    const history = await History.findByIdAndDelete(historyId);
    await Promise.all(
      history.messages.map(async (msgId) => {
        await Message.deleteOne(msgId);
      })
    );
    if (history) {
      console.log("History deleted successfully");
      return { success: true, message: "History deleted successfully" };
    } else {
      console.log("History not found");
      return { success: false, message: "History not found" };
    }
  } catch (err) {
    console.log("Error removing history", err);
    return { success: false, message: "Error removing history" };
  }
}

async function createNewHistory(newMessage, session) {
  try {
    console.log("Creating new history for session: ", session.id);
    const history = await History.create({
      userId: session.userId,
      messages: [newMessage],
    });
    session.historyId = history._id;
    return history;
  } catch (err) {
    console.error("Error creating history:", err);
  }
}
