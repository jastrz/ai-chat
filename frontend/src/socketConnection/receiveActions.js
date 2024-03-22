import { store } from "../store/store";
import {
  addMessage,
  updateMessageContent,
  updatePromptStatus,
  setHistoryId,
} from "../store/chatSlice";
import { Message } from "../data/message";
import { getHistoryIds } from "historyActions";

export const ReceiveActions = {
  Message: {
    name: "message",
    handler: handleMessageReceived,
  },
  MessageFragment: {
    name: "messageFragment",
    handler: handleMessageFragment,
  },
  PromptStateChanged: {
    name: "promptStateChanged",
    handler: handlePromptStateChanged,
  },
  SetCreatedHistory: {
    name: "setCreatedHistory",
    handler: handleCreatedHistory,
  },
};

// Possible statuses: completed, pending, processed
async function handlePromptStateChanged(data) {
  store.dispatch(updatePromptStatus(data));

  const state = store.getState().chat;
  const prompt = state.prompts.find((prompt) => prompt.guid === data.guid);

  if (data.status === "processed") {
    // temporarily not creating new messages for image prompts
    if (prompt && prompt.type !== "image") {
      const msg = new Message("AI", null, data.guid);
      store.dispatch(addMessage(msg.obj()));
    }
  }

  if (data.status === "completed") {
    await getHistoryIds();
  }
}

function handleCreatedHistory(data) {
  store.dispatch(setHistoryId(data.guid));
}

function handleMessageReceived(data) {
  const msg = new Message(data.username, data.content);
  store.dispatch(addMessage(msg.obj()));
}

function handleMessageFragment(data) {
  store.dispatch(updateMessageContent(data));
}
