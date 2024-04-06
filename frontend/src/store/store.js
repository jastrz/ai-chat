import { configureStore } from "@reduxjs/toolkit";
import { chatSlice } from "./chatSlice";
import { llamaSlice } from "./llamaSlice";
import { sdSlice } from "./sdSlice";
import { authSlice } from "./authSlice";
import { gallerySlice } from "./gallerySlice";

const rootReducer = {
  chat: chatSlice.reducer,
  llama: llamaSlice.reducer,
  sd: sdSlice.reducer,
  auth: authSlice.reducer,
  gallery: gallerySlice.reducer
};

export const store = configureStore({
  reducer: rootReducer,
});
