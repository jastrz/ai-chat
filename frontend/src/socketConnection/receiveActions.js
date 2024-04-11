import { store } from "../store/store";
import {
  addMessage,
  updateMessageContent,
  updatePromptStatus,
  setHistory,
  removeMessage,
  addPrompt,
} from "../store/chatSlice";
import { Message } from "../data/message";
import { PromptStatus } from "data/prompt";

export const ReceiveActions = {
  Message: {
    name: "message",
    handler: handleMessageReceived,
  },
  Prompt: {
    name: "prompt",
    handler: handlePromptReceived,
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

function handlePromptStateChanged(data) {
  store.dispatch(updatePromptStatus(data));

  const state = store.getState().chat;
  const prompt = state.prompts.find((prompt) => prompt.guid === data.guid);

  if (!prompt) return;

  if (data.status === PromptStatus.Processed) {
    const msg = new Message("AI", null, data.guid);
    store.dispatch(addMessage(msg.obj()));
  }

  if (data.status === PromptStatus.Completed) {
    const msg = state.messages.find((msg) => msg.guid === prompt.targetGuid);

    if (prompt.type === "text") {
      if (msg && msg.content[0] && msg.content[0].data.length === 0) {
        store.dispatch(removeMessage(msg.guid));
      }
    }

    if (prompt.type === "image") {
      store.dispatch(removeMessage(msg.guid));
    }
  }
}

function handlePromptReceived(data) {
  store.dispatch(addPrompt(data));
}

function handleCreatedHistory(data) {
  store.dispatch(setHistory(data));
}

function handleMessageReceived(data) {
  const msg = new Message(data.username, data.content);
  store.dispatch(addMessage(msg.obj()));
}

function handleMessageFragment(data) {
  store.dispatch(updateMessageContent(data));
}
