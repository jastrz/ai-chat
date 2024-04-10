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
      const msgId = state.messages.findIndex(
        (msg) => msg.guid === guidToRemove
      );
      const username = state.messages[msgId].username;
      state.messages.splice(msgId, 1);

      // fix possible incorrect 'message merges'
      for (let i = msgId; i < state.messages.length; i++) {
        state.messages[i].concat = state.messages[i - 1].username === username;
      }
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
      state.historyId = undefined;
    },
    setCurrentHistory: (state, action) => {
      state.historyId = action.payload._id;
      state.messages = action.payload.messages;
      state.messages.forEach((message) => {
        const id = state.messages.indexOf(message);
        if (id > 1) {
          message.concat = state.messages[id - 1].username === message.username;
        }
      });
    },
    setHistory: (state, action) => {
      const history = state.availableHistories.find(
        (history) => history._id === action.payload._id
      );

      if (!history) {
        state.availableHistories.push(action.payload);
      }
      state.historyId = action.payload._id;
    },
    removeHistory: (state, action) => {
      const id = action.payload;
      state.availableHistories = state.availableHistories.filter(
        (history) => history._id !== id
      );
    },
    setHistoryList: (state, action) => {
      state.availableHistories = action.payload;
    },
    reset: (state, action) => {
      clearHistory();
      state.availableHistories = [];
      state.prompts = [];
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
  setHistory,
  reset
} = chatSlice.actions;
