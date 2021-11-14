import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  linkCategories: [
    { id: 1, name: "Portfolios" },
    { id: 2, name: "Docs" },
  ],
};

export const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const {  } = linksSlice.actions;

// SELECTORS
export const selectLinkCategories = (state: RootState) =>
  state.links.linkCategories;

export default linksSlice.reducer;
