import { createSlice } from "@reduxjs/toolkit";
import { Message } from "../data/message";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    historyId: undefined,
    availableHistories: [],
    messages: [],
    prompts: [],
  },
  reducers: {
    addMessage: (state, action) => {
      let message = action.payload;
      const length = state.messages.length;
      message.concat =
        length > 0 && state.messages[length - 1].username === message.username;
      state.messages.push(message);
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
      state.messages = state.messages.filter(
        (message) => message.guid !== guidToRemove
      );
    },
    updateMessageContent: (state, action) => {
      let messageToUpdate = state.messages.find(
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
      state.messages = [];
    },
    setCurrentHistory: (state, action) => {
      clearHistory();
      state.historyId = action.payload._id;
      state.messages = action.payload.messages;
    },
    removeHistory: (state, action) => {
      state.availableHistories = state.availableHistories.filter(
        (history) => history._id !== action.payload
      );
    },
    setHistoryList: (state, action) => {
      state.availableHistories = action.payload;
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
  setCurrentHistory,
  removeHistory,
  setHistoryList,
} = chatSlice.actions;
