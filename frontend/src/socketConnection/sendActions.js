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
  SetHistory: "setHistory",
};

function sendPrompt(data) {
  // data.historyId = store.getState().chat.historyId;
  console.log(`Sending data... ${socket.id}: ${data}`);
  const historyId = store.getState().chat.historyId;
  if (historyId) {
    data.historyId = historyId;
  }

  console.log(data);

  socket.emit(SendActions.Prompt, data);
}

// sets text gen settings for session
function sendTextGenSettings(data) {
  console.log(`Sending text prompt settings... ${socket.id}: ${data}`);
  socket.emit(SendActions.TextGenSettings, data);
}

// sets image gen settings for session
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
