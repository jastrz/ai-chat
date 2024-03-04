import io from "socket.io-client";
import env from "react-dotenv";
import {
  addMessage,
  clearHistory,
  updateMessageContent,
  updatePromptStatus,
} from "./store/chatSlice";
import { store } from "./store/store";

let socket = null;

const connectWithSocketServer = () => {
  socket = io(env.SERVER_ADDRESS);
  socket.on("connect", () => {
    console.log(`successfully connected using socket: ${socket.id}`);
    const data = { username: "User" };
    socket.emit("initialize", data);
  });

  socket.on("message", handleMessageReceived);
  socket.on("messageFragment", handleMessageFragment);
  socket.on("promptStateChanged", handlePromptCompleted);
};

const handlePromptCompleted = (data) => {
  console.log(data);
  store.dispatch(updatePromptStatus(data));
};

const sendPrompt = (data) => {
  console.log(`Sending data... ${socket.id}: ${data.message}`);
  socket.emit("sendPrompt", data);
};

const sendTextGenSettings = (data) => {
  console.log(`Sending text prompt settings... ${socket.id}: ${data}`);
  socket.emit("textGenSettings", data);
};

const sendImageGenSettings = (data) => {
  console.log(`Sending image prompt settings... ${socket.id}: ${data}`);
  socket.emit("imageGenSettings", data);
};

const cancelPrompt = (data) => {
  socket.emit("cancelPrompt", data);
};

const reset = () => {
  store.dispatch(clearHistory());
  socket.emit("reset");
};

const handleMessageReceived = (data) => {
  console.log(`Received data: ${data}`);
  store.dispatch(addMessage(data));
};

const handleMessageFragment = (data) => {
  store.dispatch(updateMessageContent(data));
};

export {
  connectWithSocketServer,
  sendPrompt,
  reset,
  sendTextGenSettings,
  sendImageGenSettings,
  cancelPrompt,
};
