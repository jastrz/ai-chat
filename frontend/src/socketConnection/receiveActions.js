import { store } from "../store/store";
import {
  addMessage,
  updateMessageContent,
  updatePromptStatus,
  setHistory,
  removeMessage,
} from "../store/chatSlice";
import { Message } from "../data/message";
import { PromptStatus } from "data/prompt";

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
    handler: handleSetHistory,
  },
};

function handlePromptStateChanged(data) {
  store.dispatch(updatePromptStatus(data));

  const state = store.getState().chat;
  const message = state.messages.find((msg) => msg.guid === data.guid);
  const prompt = message.prompt;

  if (!prompt) return;

  if (data.status === PromptStatus.Processed) {
    const msg = new Message({
      username: "AI",
      messageTarget: message.guid || null,
      guid: prompt.targetGuid,
    }).obj();

    store.dispatch(addMessage(msg));
  }

  if (data.status === PromptStatus.Completed) {
    const msg = state.messages.find((msg) => msg.guid === prompt.targetGuid);
    if (!msg) return;

    if (prompt.type === "text") {
      if (msg.content[0] && msg.content[0].data.length === 0) {
        store.dispatch(removeMessage(msg.guid));
      }
    }

    if (prompt.type === "image") {
      store.dispatch(removeMessage(msg.guid));
    }
  }
}

function handleSetHistory(data) {
  store.dispatch(setHistory(data));
}

function handleMessageReceived(data) {
  const message = new Message(data).obj();
  store.dispatch(addMessage(message));
}

function handleMessageFragment(data) {
  store.dispatch(updateMessageContent(data));
}
