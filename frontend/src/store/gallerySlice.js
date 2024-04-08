import { createSlice } from "@reduxjs/toolkit";

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    isOpen: false,
    images: [],
    currentIndex: 0,
  },
  reducers: {
    open: (state, action) => {
      state.isOpen = true;
      state.images = action.payload.images;
      state.currentIndex = action.payload.currentIndex;
    },
    close: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { open, close } = gallerySlice.actions;
