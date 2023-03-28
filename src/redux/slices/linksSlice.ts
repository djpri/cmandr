import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

const initialState = {
  showImagePreviews: true,
};

export const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    toggleShowImagePreviews: (state) => {
      state.showImagePreviews = !state.showImagePreviews;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleShowImagePreviews } =
  linksSlice.actions;

// SELECTORS
export const selectShowImagePreviews = (state: RootState) =>
  state.links.showImagePreviews;

export default linksSlice.reducer;
