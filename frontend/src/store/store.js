import { configureStore } from "@reduxjs/toolkit";
import { chatSlice } from "./chatSlice";
import { llamaSlice } from "./llamaSlice";
import { sdSlice } from "./sdSlice";

const rootReducer = {
  chat: chatSlice.reducer,
  llama: llamaSlice.reducer,
  sd: sdSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
