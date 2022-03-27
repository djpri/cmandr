import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

const initialState = {
  isSidebarOpen: true,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setSidebarToggle: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarClosed: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSidebarToggle, setSidebarClosed } = layoutSlice.actions;

// SELECTORS
export const selectIsSidebarOpen = (state: RootState) =>
  state.layout.isSidebarOpen;

export default layoutSlice.reducer;