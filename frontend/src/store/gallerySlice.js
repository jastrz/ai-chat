import { createSlice } from "@reduxjs/toolkit";

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    isOpen: false,
    images: [],
  },
  reducers: {
    open: (state, action) => {
      state.isOpen = true;
      state.images = action.payload;
    },
    close: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { open, close } = gallerySlice.actions;
