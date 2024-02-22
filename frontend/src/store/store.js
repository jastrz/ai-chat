import { configureStore } from "@reduxjs/toolkit";
import { chatSlice } from "./chatSlice";
import { llamaSlice } from "./llamaSlice";

const rootReducer = {
  chat: chatSlice.reducer,
  llama: llamaSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
