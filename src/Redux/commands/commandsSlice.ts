import { ICommand } from "./../../types/types";
import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";
import { AppThunk } from "../store";
import { collection, getDoc, getDocs, doc } from "@firebase/firestore";

type CommandsState = {
  commands: ICommand[];
  categories: string[];
};

const initialState: CommandsState = {
  commands: [],
  categories: [],
};

export const commandsSlice = createSlice({
  name: "commands",
  initialState,
  reducers: {
    // setCommands(commands: [])
    setCommands: (state, { payload }) => {
      state.commands = payload;
    },
    setCommandCategories: (state, { payload }) => {
      state.categories = payload;
    },
    // setAddCommand(command)
    setAddCommand: (state, { payload }) => {
      const newState = state.commands;
      newState.push(payload);
      state.commands = newState;
    },
    // setDeleteCommand(command)
    setEditCommand: (state, { payload }) => {
      const newState = state.commands;
      const index = newState.findIndex((command) => command.id === payload.id);
      newState[index] = payload;
      state.commands = newState;
    },
    // setDeleteCommand(id) deletes command with matching id
    setDeleteCommand: (state, { payload }) => {
      const newState = state.commands;
      const index = newState.findIndex((command) => command.id === payload);
      newState.splice(index, 1);
      state.commands = newState;
    },
  },
});

export const {
  setCommands,
  setCommandCategories,
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

export default commandsSlice.reducer;
