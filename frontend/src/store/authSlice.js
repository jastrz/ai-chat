import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: { username: "User" },
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    reset: (state, action) => {
      state.userData = { username: "User" };
    },
  },
});

export const { setUserData } = authSlice.actions;
