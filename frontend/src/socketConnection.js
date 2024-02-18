import io from "socket.io-client";
import env from "react-dotenv";
import { addMessage, clearHistory } from "./app/store";
import { store } from "./app/store";

const URL = process.env.REACT_APP_SERVER_ADDRESS;

let socket = null;

export const connectWithSocketServer = () => {
  socket = io(env.SERVER_ADDRESS);
  socket.on("connect", () => {
    console.log(`successfully connected using socket: ${socket.id}`);
  });

  socket.on("message", handleMessageReceived);
};

export const sendMessageThroughSocket = (data) => {
  console.log(`Sending data... ${socket.id}: ${data.message}`);
  socket.emit("sendMessage", data);
};

export const reset = () => {
  store.dispatch(clearHistory());
  socket.emit("reset");
};

const handleMessageReceived = (data) => {
  console.log(`response: ${data.content}`);
  store.dispatch(addMessage(data));
};
