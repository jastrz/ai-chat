import { createSlice } from "@reduxjs/toolkit";

export const sdSlice = createSlice({
  name: "sd",
  initialState: {
    modelName: "",
    availableModels: [],
    promptSettings: {
      height: 512,
      width: 512,
      numImages: 1,
      negativePrompt: "",
    },
  },
  reducers: {
    setPromptSettings: (state, action) => {
      state.promptSettings = { ...state.promptSettings, ...action.payload };
    },
    setModelName: (state, action) => {
      state.modelName = action.payload;
    },
    setAvailableModels: (state, action) => {
      state.availableModels = action.payload;
    },
  },
});

export const { setPromptSettings, setModelName, setAvailableModels } =
  sdSlice.actions;
