import { createSlice } from "@reduxjs/toolkit";

export const llamaSlice = createSlice({
  name: "llama",
  initialState: {
    modelName: "",
    batchSize: 256,
    contextSize: 2048,
    availableModels: [],
  },
  reducers: {
    setLlamaSettings: (state, action) => {
      state.modelName = action.payload.modelName || state.modelName;
      state.batchSize = action.payload.batchSize || state.batchSize;
      state.contextSize = action.payload.contextSize || state.contextSize;
    },
    setAvailableModels: (state, action) => {
      state.availableModels = action.payload;
    },
    setBatchSize: (state, action) => {
      console.log(action.payload);
      state.batchSize = action.payload;
    },
    setContextSize: (state, action) => {
      state.contextSize = action.payload;
    },
    setModelName: (state, action) => {
      state.modelName = action.payload;
    },
  },
});

export const {
  setLlamaSettings,
  setAvailableModels,
  setBatchSize,
  setContextSize,
  setModelName,
} = llamaSlice.actions;
