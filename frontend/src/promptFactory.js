import { store } from "./store/store";

export function getPrompt(type, message) {
  let prompt = {
    type: type,
    message: message,
  };

  if (type === "image") {
    prompt.settings = store.getState().sd.promptSettings;
  }

  if (type === "text") {
    prompt.settings = store.getState().llama.promptSettings;
  }

  return prompt;
}
