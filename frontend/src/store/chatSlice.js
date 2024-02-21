import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    message: [],
    history: [],
  },
  reducers: {
    setMessageToSend: (state, action) => {
      state.message = action.payload;
      state.history.push(action.payload);
    },
    addMessage: (state, action) => {
      state.history.push(action.payload);
    },
    clearHistory: (state) => {
      state.history = [];
      state.message = [];
    },
  },
});

export const { setMessageToSend, addMessage, clearHistory } = chatSlice.actions;
