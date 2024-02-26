import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    message: [],
    history: [],
  },
  reducers: {
    setUserMessage: (state, action) => {
      state.message = action.payload;
      state.history.push(action.payload);
    },
    addMessage: (state, action) => {
      let message = action.payload;

      // Reconsider if history will be stored in db
      if (message.guid === null) {
        message.guid = state.history.length;
      }
      state.history.push(action.payload);
    },
    updateMessageContent: (state, action) => {
      // Updates message with given guid
      // q: Should update only last msg?
      const messageToUpdate = state.history.find(
        (msg) => msg.guid === action.payload.targetGuid
      );

      messageToUpdate.content[0].data += action.payload.data;
    },
    clearHistory: (state) => {
      state.history = [];
      state.message = [];
    },
  },
});

export const {
  setUserMessage,
  addMessage,
  clearHistory,
  updateMessageContent,
} = chatSlice.actions;
