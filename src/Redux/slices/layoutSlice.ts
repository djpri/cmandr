import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

const initialState = {
  isSidebarOpen: true,
  categoriesOpen: {},
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
    setCategoryOpen: (state, action: { payload: number }) => {
      state.categoriesOpen = {
        ...state.categoriesOpen,
        [action.payload]: true,
      };
    },
    setCategoryClose: (state, action: { payload: number }) => {
      state.categoriesOpen = {
        ...state.categoriesOpen,
        [action.payload]: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSidebarToggle,
  setSidebarClosed,
  setCategoryClose,
  setCategoryOpen,
} = layoutSlice.actions;

// SELECTORS
export const selectIsSidebarOpen = (state: RootState) =>
  state.layout.isSidebarOpen;

export const selectOpenCategories = (state: RootState) =>
  state.layout.categoriesOpen;

export default layoutSlice.reducer;
