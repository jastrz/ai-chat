import { configureStore, createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    message: "",
    history: [],
  },
  reducers: {
    sendMessage: (state, action) => {
      console.log(`state message: ${action.payload}`);
      state.message = action.payload;
      state.history.push(action.payload);
    },
    addMessage: (state, action) => {
      state.history.push(action.payload);
    },
    clearHistory: (state) => {
      state.history = [];
      state.message = "";
    },
  },
});

export const {
  sendMessage: sendMessage,
  addMessage: addMessage,
  clearHistory: clearHistory,
} = chatSlice.actions;

export const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
  },
});
