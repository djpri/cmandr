import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

const initialState = {
  userHasReceivedToken: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppInitialization: (state) => {
      state.userHasReceivedToken = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAppInitialization } = appSlice.actions;

// SELECTORS
export const selectUserHasReceivedToken = (state: RootState) =>
  state.app.userHasReceivedToken;

export default appSlice.reducer;
