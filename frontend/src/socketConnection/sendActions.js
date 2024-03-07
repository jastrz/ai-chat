import { socket } from "./socketConnection";
import { store } from "../store/store";
import { clearHistory } from "../store/chatSlice";

const SendActions = {
  Initialize: "initialize",
  Prompt: "sendPrompt",
  CancelPrompt: "cancelPrompt",
  ImageGenSettings: "imageGenSettings",
  TextGenSettings: "textGenSettings",
  Reset: "reset",
};

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
  SendActions,
  sendPrompt,
  reset,
  sendTextGenSettings,
  sendImageGenSettings,
  cancelPrompt,
};
