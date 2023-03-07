import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

const initialState = {
  userHasReceivedToken: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserSession: (state) => {
      state.userHasReceivedToken = true;
    },
    setEndOfUserSession: (state) => {
      state.userHasReceivedToken = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserSession, setEndOfUserSession } = appSlice.actions;

// SELECTORS
export const selectUserHasReceivedToken = (state: RootState) =>
  state.app.userHasReceivedToken;

export default appSlice.reducer;
