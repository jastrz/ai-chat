import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: { username: "User" },
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      console.log(state.userData);
    },
  },
});

export const { setUserData } = authSlice.actions;
