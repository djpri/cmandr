import { Command, CommandsState } from "./../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";
import { AppThunk } from "../store";
import { collection, getDoc, getDocs, doc } from "@firebase/firestore";

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
    setCommandCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setAddCommandCategory: (state, action: PayloadAction<string>) => {
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
export const selectAllCommands = (state) => state.commands.commands;
export const selectAllCategories = (state) => state.commands.categories;

// ASYNC ACTIONS
export const getCommandsFromDB = (): AppThunk => async (dispatch, getState) => {
  const user = getState().userAuth?.userData?.uid;

  const addData = async () => {
    const userDataSnap = await getDoc(doc(db, "users", user!));

    if (userDataSnap.exists()) {
      const data = userDataSnap.data();
      dispatch(setCommandCategories(data.commandCategories));
    }

    const commandsSnap: any = await getDocs(
      collection(db, `users/${user}/commands`)
    );
    const commands = commandsSnap.docs.map((doc) => {
      let docInfo = doc.data();
      docInfo.id = doc.id;
      return docInfo;
    });
    dispatch(setCommands(commands));
  };
  if (user) {
    addData();
  } else {
    dispatch(setCommands([]));
  }
};

export const sortCommandsByField =
  (field, isAscending = true): AppThunk =>
  async (dispatch, getState) => {
    let newState = [...getState().commands.commands];

    newState.sort((a, b) => {
      let valueA = a[field].toUpperCase();
      let valueB = b[field].toUpperCase();
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });

    if (isAscending === false) dispatch(setCommands(newState.reverse()));
    dispatch(setCommands(newState));
  };

export const addCommandCategory =
  (category: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAddCommandCategory(category));
  };

export default commandsSlice.reducer;
