import { createSlice } from "@reduxjs/toolkit";
import { Message } from "../data/message";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    historyId: undefined,
    availableHistories: [],
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      let message = action.payload;
      // state.messages = state.messages.filter(
      //   (msg) => msg.guid !== message.guid
      // );
      if (message.messageTarget) {
        const messageTargetIndex = state.messages.findIndex(
          (msg) => msg.guid === message.messageTarget
        );
        state.messages.splice(messageTargetIndex + 1, 0, message);
      } else {
        state.messages.push(message);
      }
    },
    updatePromptStatus: (state, action) => {
      const prompt = state.messages.find(
        (msg) => msg.guid === action.payload.guid
      ).prompt;
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
        messageToUpdate = new Message({ username: "AI", guid: targetGuid });
        addMessage(state, messageToUpdate.obj());
      }

      messageToUpdate.timestamp = new Date().toString();
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
    setPromptTarget: (state, action) => {
      const { id, targetGuid } = action.payload;
      const msg = state.messages.find((msg) => msg.guid === id);
      console.log(id, targetGuid, msg);
      msg.prompt.targetGuid = targetGuid;
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
      } else {
        history.timestamp = action.payload.timestamp;
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
  updatePromptStatus,
  setCurrentHistory,
  removeHistory,
  setHistoryList,
  setHistory,
  reset,
  setPromptTarget,
} = chatSlice.actions;
