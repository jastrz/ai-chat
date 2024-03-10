import { createSlice } from "@reduxjs/toolkit";
import { Message } from "../data";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    history: [],
    prompts: [],
  },
  reducers: {
    addMessage: (state, action) => {
      let message = action.payload;
      const length = state.history.length;
      message.concat =
        length > 0 && state.history[length - 1].username === message.username;
      state.history.push(message);
    },
    addPrompt: (state, action) => {
      let prompt = action.payload;
      state.prompts.push(prompt);
    },
    updatePromptStatus: (state, action) => {
      const prompt = state.prompts.find(
        (prompt) => prompt.guid === action.payload.guid
      );
      if (prompt) {
        prompt.status = action.payload.status;
      }
    },
    removeMessage: (state, action) => {
      const guidToRemove = action.payload;
      state.history = state.history.filter(
        (message) => message.guid !== guidToRemove
      );
    },
    updateMessageContent: (state, action) => {
      let messageToUpdate = state.history.find(
        (msg) => msg.guid === action.payload.targetGuid
      );

      if (!messageToUpdate) {
        messageToUpdate = new Message("AI").obj();
        messageToUpdate.guid = action.payload.targetGuid;
        addMessage(state, messageToUpdate);
      }

      messageToUpdate.content[0].data += action.payload.data;
    },
    clearHistory: (state) => {
      state.history = [];
      state.message = [];
    },
  },
});

export const {
  addMessage,
  clearHistory,
  updateMessageContent,
  removeMessage,
  addPrompt,
  updatePromptStatus,
} = chatSlice.actions;
