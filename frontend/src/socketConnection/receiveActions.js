import { store } from "../store/store";
import {
  addMessage,
  updateMessageContent,
  updatePromptStatus,
} from "../store/chatSlice";
import { Message } from "../data/message";

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
};

// Possible statuses: completed, pending, processed
function handlePromptStateChanged(data) {
  store.dispatch(updatePromptStatus(data));

  // temporarily not creating new messages for image prompts
  const state = store.getState().chat;
  const prompt = state.prompts.find((prompt) => prompt.guid === data.guid);
  if (data.status === "processed" && prompt && prompt.type !== "image") {
    const msg = new Message("AI", null, data.guid);
    store.dispatch(addMessage(msg.obj()));
  }
}

function handleMessageReceived(data) {
  const msg = new Message(data.username, data.content);
  store.dispatch(addMessage(msg.obj()));
}

function handleMessageFragment(data) {
  store.dispatch(updateMessageContent(data));
}
