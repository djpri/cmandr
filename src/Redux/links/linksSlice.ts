import { AppThunk, RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Link, LinkCategory, LinksState } from "../../models/models";

const initialState: LinksState = {
  links: [],
  categories: [],
};

export const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    setLinks: (state, action: PayloadAction<Link[]>) => {
      state.links = action.payload;
    },
    setAddLink: (state, action: PayloadAction<Link>) => {
      const newState = state.links;
      newState.push(action.payload);
      state.links = newState;
    },
    setEditLink: (state, action: PayloadAction<Link>) => {
      const newState = state.links;
      const index = newState.findIndex(
        (command) => command.id === action.payload.id
      );
      newState[index] = action.payload;
      state.links = newState;
    },
    setDeleteLink: (state, action: PayloadAction<number>) => {
      const newState = state.links;
      const index = newState.findIndex(
        (command) => command.id === action.payload
      );
      newState.splice(index, 1);
      state.links = newState;
    },
    setLinkCategories: (state, action: PayloadAction<LinkCategory[]>) => {
      state.categories = action.payload;
    },
    setAddLinkCategory: (state, action: PayloadAction<LinkCategory>) => {
      const newState = state.categories;
      newState.push(action.payload);
      state.categories = newState;
    },
    setEditLinkCategory: (state, action: PayloadAction<LinkCategory>) => {
      const newState = state.categories;
      const indexToEdit = newState.findIndex(
        (item) => item.id === action.payload.id
      );
      newState[indexToEdit] = action.payload;
      state.categories = newState;
    },
    setDeleteLinkCategory: (state, action: PayloadAction<number>) => {
      const newState = state.categories;
      const indexToDelete = newState.findIndex(
        (item) => item.id === action.payload
      );
      newState.splice(indexToDelete, 1);
      state.categories = newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLinks,
  setLinkCategories,
  setAddLinkCategory,
  setAddLink,
  setEditLink,
  setDeleteLink,
  setEditLinkCategory,
  setDeleteLinkCategory,
} = linksSlice.actions;

// SELECTORS
export const selectAllLinks = (state: RootState) => state.links.links;
export const selectLinkCategories = (state: RootState) =>
  state.links.categories;
export const selectLinksCategoriesAsObject = (state: RootState) => {
  const links = {};
  state.links.categories.forEach((item) => {
    links[item.id] = item.name;
  });
  return links;
};

// ASYNC ACTIONS
export const sortLinksByField =
  (field, isAscending = true): AppThunk =>
  async (dispatch, getState) => {
    let newState = [...getState().links.links];

    if (field === "title" || field === "link") {
      newState.sort((a, b) => {
        let valueA = a[field].toUpperCase();
        let valueB = b[field].toUpperCase();
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
      });
    }

    if (field === "category") {
      newState.sort((a, b) => {
        let valueA = a[field].name.toUpperCase();
        let valueB = b[field].name.toUpperCase();
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
      });
    }

    if (isAscending === false) dispatch(setLinks(newState.reverse()));
    dispatch(setLinks(newState));
  };

export default linksSlice.reducer;
