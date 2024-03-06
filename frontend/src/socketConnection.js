import io from "socket.io-client";
import env from "react-dotenv";
import {
  addMessage,
  clearHistory,
  updateMessageContent,
  updatePromptStatus,
} from "./store/chatSlice";
import { store } from "./store/store";
import { Message } from "./data";

let socket = null;

const SendActions = {
  Initialize: "initialize",
  Prompt: "sendPrompt",
  CancelPrompt: "cancelPrompt",
  ImageGenSettings: "imageGenSettings",
  TextGenSettings: "textGenSettings",
  Reset: "reset",
};

const ReceiveActions = {
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

function connectWithSocketServer() {
  socket = io(env.SERVER_ADDRESS);
  socket.on("connect", () => {
    console.log(`successfully connected using socket: ${socket.id}`);
    const data = { username: store.getState().auth.userData.username };
    socket.emit(SendActions.Initialize, data);
  });

  // subscribe all receive actions
  const receiveActions = Object.values(ReceiveActions);
  receiveActions.forEach((action) => {
    socket.on(action.name, action.handler);
  });
}

//
// Receive Actions
//

// Possible statuses: completed, pending, processed
function handlePromptStateChanged(data) {
  store.dispatch(updatePromptStatus(data));

  // temporarily not creating new messages for image prompts
  const state = store.getState().chat;
  const prompt = state.prompts.find((prompt) => prompt.guid === data.guid);
  if (data.status === "processed" && prompt && prompt.type !== "image") {
    const msg = new Message("AI", null, data.guid);
    store.dispatch(addMessage(msg.toJSON()));
  }
}

function handleMessageReceived(data) {
  console.log(`Received data: ${data}`);
  const msg = new Message(data.username, data.content);
  store.dispatch(addMessage(msg.toJSON()));
}

function handleMessageFragment(data) {
  store.dispatch(updateMessageContent(data));
}

//
// Send Actions
//
function sendPrompt(data) {
  console.log(`Sending data... ${socket.id}: ${data.message}`);
  socket.emit(SendActions.Prompt, data);
}

function sendTextGenSettings(data) {
  console.log(`Sending text prompt settings... ${socket.id}: ${data}`);
  socket.emit(SendActions.TextGenSettings, data);
}

function sendImageGenSettings(data) {
  console.log(`Sending image prompt settings... ${socket.id}: ${data}`);
  socket.emit(SendActions.ImageGenSettings, data);
}

function cancelPrompt(data) {
  socket.emit(SendActions.CancelPrompt, data);
}

function reset() {
  store.dispatch(clearHistory());
  socket.emit(SendActions.Reset);
}

export {
  connectWithSocketServer,
  sendPrompt,
  reset,
  sendTextGenSettings,
  sendImageGenSettings,
  cancelPrompt,
};
