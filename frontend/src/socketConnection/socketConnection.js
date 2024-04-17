import io from "socket.io-client";
import env from "react-dotenv";
import { store } from "../store/store";
import { ReceiveActions } from "./receiveActions";
import { SendActions } from "./sendActions";

let socket = null;

function connectWithSocketServer(token) {
  socket = io(env.SERVER_ADDRESS, {
    auth: {
      token: token,
    },
  });

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

function disconnectFromSocketServer() {
  if (socket) {
    socket.disconnect();
  }
}

export { connectWithSocketServer, disconnectFromSocketServer, socket };
