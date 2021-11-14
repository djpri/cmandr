import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: true,
};

export const linksSlice = createSlice({
  name: "commands",
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
export const { setSidebarToggle, setSidebarClosed } = linksSlice.actions;

// SELECTORS
export const selectIsSidebarOpen = (state) => state.layout.isSidebarOpen;

export default linksSlice.reducer;
