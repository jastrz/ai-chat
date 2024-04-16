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
      state.messages = state.messages.filter(
        (msg) => msg.guid !== message.guid
      );
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
      state.messages.splice(msgId, 1);
    },
    updateMessageContent: (state, action) => {
      const { targetGuid, content } = action.payload;
      let messageToUpdate = state.messages.find(
        (msg) => msg.guid === targetGuid
      );

      if (!messageToUpdate) {
        messageToUpdate = new Message("AI").obj();
        messageToUpdate.guid = targetGuid;
        addMessage(state, messageToUpdate);
      }

      messageToUpdate.content = content.map((entry, i) => {
        const existingContent = messageToUpdate.content[i] || {
          data: "",
          type: "text",
        };
        return {
          type: entry.type,
          data:
            entry.updateType === "aggregate"
              ? existingContent.data + entry.data
              : entry.data,
        };
      });
    },
    clearHistory: (state) => {
      state.messages = [];
      state.historyId = undefined;
    },
    setCurrentHistory: (state, action) => {
      state.historyId = action.payload._id;
      state.messages = action.payload.messages;
      state.prompts = [];
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
  reset,
} = chatSlice.actions;
