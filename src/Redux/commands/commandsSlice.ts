import { Command, CommandsState } from "./../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { slugify } from "../../utils/slugify";
import { supabase } from "../../supabase/supabase";
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
  },
});

export const {
  setCommands,
  setCommandCategories,
  setAddCommandCategory,
  setAddCommand,
  setEditCommand,
  setDeleteCommand,
} = commandsSlice.actions;

// SELECTORS
export const selectAllCommands = (state: RootState) => state.commands.commands;

export const selectAllCategories = (state: RootState) =>
  Array.from(state.commands.categories, (category) => category.name);

export const selectAllCategoriesWithIds = (state: RootState) =>
  Array.from(state.commands.categories);

export const selectCommandsByCategory = (state, category: string) => {
  return state.commands.commands.filter((item: Command) => {
    const cat = slugify(item.category);
    return cat === category;
  });
};

// ASYNC ACTIONS
export const getCommandsFromDB = (): AppThunk => async (dispatch, getState) => {
  const addData = async () => {
    const { data: commands } = await supabase.from("commands").select(`
        id,
        description,
        command,
        reference,
        category:command_categories(
          id,
          name
        )
      `);

    const { data: categories } = await supabase
      .from("command_categories")
      .select(`id, name`);

    if (categories !== null) dispatch(setCommandCategories(categories));

    console.log(commands);

    if (commands !== null) {
      // commands.map((command) => ({
      //   id: command.id,
      //   description: command.description,
      //   command: command.command,
      //   reference: command.reference,
      //   category: command.category.name,
      // }));
      dispatch(setCommands(commands));
    } else {
      dispatch(setCommands([]));
    }
  };

  addData();
};

export const sortCommandsByField =
  (field, isAscending = true): AppThunk =>
  async (dispatch, getState) => {
    let newState = [...getState().commands.commands];

    if (field === "description" || field === "command") {
      newState.sort((a, b) => {
        console.log(a[field]);
        let valueA = a[field].toUpperCase();
        let valueB = b[field].toUpperCase();
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
      });
    }

    if (field === "category") {
      newState.sort((a, b) => {
        console.log(a[field].name);
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
