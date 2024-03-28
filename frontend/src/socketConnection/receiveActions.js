import { store } from "../store/store";
import {
  addMessage,
  updateMessageContent,
  updatePromptStatus,
  setHistoryId,
  removeMessage,
} from "../store/chatSlice";
import { Message } from "../data/message";
import { getHistoryIds } from "historyActions";
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
    handler: handleCreatedHistory,
  },
};

// Possible statuses: completed, pending, processed
async function handlePromptStateChanged(data) {
  store.dispatch(updatePromptStatus(data));

  const state = store.getState().chat;
  const prompt = state.prompts.find((prompt) => prompt.guid === data.guid);

  if (data.status === PromptStatus.Processed) {
    // temporarily not creating new messages for image prompts
    if (prompt) {
      const msg = new Message("AI", null, data.guid);
      store.dispatch(addMessage(msg.obj()));
    }
  }

  if (data.status === PromptStatus.Completed) {
    const msg = state.messages.find((msg) => msg.guid === prompt.targetGuid);
    if (msg && msg.content[0] && msg.content[0].data.length === 0) {
      store.dispatch(removeMessage(msg.guid));
    }
    await getHistoryIds();
  }
}

function handleCreatedHistory(data) {
  store.dispatch(setHistoryId(data.guid));
}

function handleMessageReceived(data) {
  const msg = new Message(data.username, data.content);
  console.log(data);
  store.dispatch(addMessage(msg.obj()));
}

function handleMessageFragment(data) {
  store.dispatch(updateMessageContent(data));
}
