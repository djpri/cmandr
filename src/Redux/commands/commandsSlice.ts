import { Command, CommandsState } from "./../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { slugify } from "../../utils/slugify";
import { CommandCategory } from "./../../types/types";

const initialState: CommandsState = {
  commands: [],
  categories: [],
};

export const commandsSlice = createSlice({
  name: "commands",
  initialState,
  reducers: {
    setCommands: (state, action: PayloadAction<Command[]>) => {
      state.commands = action.payload;
    },
    setAddCommand: (state, action: PayloadAction<Command>) => {
      const newState = state.commands;
      newState.push(action.payload);
      state.commands = newState;
    },
    setEditCommand: (state, action: PayloadAction<Command>) => {
      const newState = state.commands;
      const index = newState.findIndex(
        (command) => command.id === action.payload.id
      );
      newState[index] = action.payload;
      state.commands = newState;
    },
    setDeleteCommand: (state, action: PayloadAction<string>) => {
      const newState = state.commands;
      const index = newState.findIndex(
        (command) => command.id === action.payload
      );
      newState.splice(index, 1);
      state.commands = newState;
    },
    setCommandCategories: (state, action: PayloadAction<CommandCategory[]>) => {
      state.categories = action.payload;
    },
    setAddCommandCategory: (state, action: PayloadAction<CommandCategory>) => {
      const newState = state.categories;
      newState.push(action.payload);
      state.categories = newState;
    },
    setEditCommandCategory: (state, action: PayloadAction<CommandCategory>) => {
      const newState = state.categories;
      const indexToEdit = newState.findIndex(
        (item) => item.id === action.payload.id
      );
      newState[indexToEdit] = action.payload;
      state.categories = newState;
    },
    setDeleteCommandCategory: (state, action: PayloadAction<string>) => {
      const newState = state.categories;
      const indexToDelete = newState.findIndex(
        (item) => item.id === action.payload
      );
      newState.splice(indexToDelete, 1);
      state.categories = newState;
    },
  },
});

export const {
  setCommands,
  setCommandCategories,
  setAddCommandCategory,
  setAddCommand,
  setEditCommand,
  setDeleteCommand,
  setEditCommandCategory,
  setDeleteCommandCategory,
} = commandsSlice.actions;

// SELECTORS
export const selectCommands = (state: RootState) => state.commands.commands;

export const selectCategories = (state: RootState) =>
  Array.from(state.commands.categories, (category) => category.name);

export const selectCategoriesWithIds = (state: RootState) =>
  state.commands.categories;

export const selectCategoriesAsKeyValuePairs = (state: RootState) => {
  const categories = {};
  state.commands.categories.forEach((item) => {
    categories[item.id] = item.name;
  });
  return categories;
};

export const selectCommandsByCategory = (state, category: string) => {
  return state.commands.commands.filter((item: Command) => {
    const cat = slugify(item.category.name);
    return cat === category;
  });
};

// ASYNC ACTIONS
export const sortCommandsByField =
  (field, isAscending = true): AppThunk =>
  async (dispatch, getState) => {
    let newState = [...getState().commands.commands];

    if (field === "description" || field === "command") {
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

    if (isAscending === false) dispatch(setCommands(newState.reverse()));
    dispatch(setCommands(newState));
  };

export const addCommandCategory =
  (category: CommandCategory): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAddCommandCategory(category));
  };

export default commandsSlice.reducer;
