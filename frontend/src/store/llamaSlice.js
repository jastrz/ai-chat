import { createSlice } from "@reduxjs/toolkit";

export const llamaSlice = createSlice({
  name: "llama",
  initialState: {
    availableModels: [],
    contextSettings: {
      modelName: "",
      batchSize: 256,
      contextSize: 2048,
    },
    promptSettings: {
      temperature: 0.8,
      topP: 0.03,
      topK: 30,
    },
  },
  reducers: {
    setContextSettings: (state, action) => {
      state.contextSettings = {
        ...state.contextSettings,
        ...action.payload,
      };
    },
    setPromptSettings: (state, action) => {
      state.promptSettings = {
        ...state.promptSettings,
        ...Object.fromEntries(
          Object.entries(action.payload).map(([key, value]) => [
            key,
            parseFloat(value),
          ])
        ),
      };
    },

    setAvailableModels: (state, action) => {
      state.availableModels = action.payload;
    },
  },
});

export const { setContextSettings, setAvailableModels, setPromptSettings } =
  llamaSlice.actions;
