import Message from "./models/message.js";
import History from "./models/history.js";
import User from "./models/user.js";

export async function getNewHistoryId(userId) {
  try {
    const history = await History.create({ userId, messages: [] });
    if (history) {
      return history._id;
    }
  } catch (err) {
    console.log(err.message);
  }
}

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
    const histories = await History.find({ userId }).select("_id");

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

export async function saveMessage(message, session) {
  const newMessage = await Message.create({
    username: message.username,
    content: message.content,
  });

  try {
    let history = await History.findById(session.historyId);
    if (history) {
      history.messages.push(newMessage);
      await history.save();
    } else {
      await createNewHistory(newMessage, session);
    }
  } catch (err) {
    console.log(err.message);
  }
}

export async function removeHistory(historyId) {
  try {
    const result = await History.findByIdAndDelete(historyId);
    if (result) {
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
  } catch (err) {
    console.error("Error creating history:", err);
  }
}
