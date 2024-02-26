import io from "socket.io-client";
import env from "react-dotenv";
import {
  addMessage,
  clearHistory,
  updateMessageContent,
} from "./store/chatSlice";
import { store } from "./store/store";

let socket = null;

const connectWithSocketServer = () => {
  socket = io(env.SERVER_ADDRESS);
  socket.on("connect", () => {
    console.log(`successfully connected using socket: ${socket.id}`);
  });

  socket.on("message", handleMessageReceived);
  socket.on("messageFragment", handleMessageFragment);
};

const sendPrompt = (data) => {
  console.log(`Sending data... ${socket.id}: ${data.message}`);
  socket.emit("sendPrompt", data);
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

export { connectWithSocketServer, sendPrompt, reset };
