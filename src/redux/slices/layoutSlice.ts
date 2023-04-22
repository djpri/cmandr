import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

const initialState = {
  isSidebarOpen: true,
  sideBarAccordionIndex: [2, 4, 6],
  categoriesOpen: {},
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setSidebarToggle: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state) => {
      state.isSidebarOpen = true;
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
    setSidebarAccordionIndex: (state, action: { payload: number }) => {
      if (state.sideBarAccordionIndex.includes(action.payload)) {
        state.sideBarAccordionIndex = state.sideBarAccordionIndex.filter(
          (index) => index !== action.payload
        );
      } else {
        state.sideBarAccordionIndex = [
          ...state.sideBarAccordionIndex,
          action.payload,
        ];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSidebarToggle,
  setSidebarClosed,
  setSidebarOpen,
  setCategoryClose,
  setCategoryOpen,
  setSidebarAccordionIndex,
} = layoutSlice.actions;

// SELECTORS
export const selectIsSidebarOpen = (state: RootState) =>
  state.layout.isSidebarOpen;

export const selectOpenCategories = (state: RootState) =>
  state.layout.categoriesOpen;

export const selectSidebarAccordionIndex = (state: RootState) =>
  state.layout.sideBarAccordionIndex;

export default layoutSlice.reducer;
