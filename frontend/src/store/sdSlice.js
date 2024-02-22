import { createSlice } from "@reduxjs/toolkit";

export const sdSlice = createSlice({
  name: "sd",
  initialState: {
    promptSettings: {
      height: 512,
      width: 512,
      numImages: 1,
      negativePrompt: "",
    },
  },
  reducers: {
    setPromptSettings: (state, action) => {
      state.promptSettings.height =
        action.payload.height || state.promptSettings.height;
      state.promptSettings.width =
        action.payload.width || state.promptSettings.width;
      state.promptSettings.numImages =
        action.payload.numImages || state.promptSettings.numImages;
      state.promptSettings.negativePrompt =
        action.payload.negativePrompt || state.negativePrompt;
    },
  },
});

export const { setPromptSettings } = sdSlice.actions;
