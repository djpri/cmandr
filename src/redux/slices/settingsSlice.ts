import { createSlice } from "@reduxjs/toolkit";
import { Entity } from "models/entity";

type SortOption = "ascending" | "descending" | "size" | "manual";

type UserSettings = {
  categoriesSort: Record<string, SortOption>;
};

const initialState: UserSettings = {
  categoriesSort: {
    command: "ascending",
    link: "ascending",
    snippet: "ascending",
  },
};

export const settingsSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCategoriesSort: (state, action: { payload: { entity: Entity, sortOption: SortOption } }) => {
      const { entity, sortOption } = action.payload;
      state.categoriesSort[entity] = sortOption;
    },
  },
});

// ACTIONS
export const { setCategoriesSort } = settingsSlice.actions;

// SELECTORS
export const selectCategoriesSort = (state: { settings: UserSettings }) => state.settings.categoriesSort;

export default settingsSlice.reducer;
