import { ICommand } from "./../../types/types";
import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";
import { AppThunk } from "../store";
import { collection, getDocs } from "@firebase/firestore";

type CommandsState = {
  commands: ICommand[];
};

const initialState: CommandsState = {
  commands: [],
};

export const commandsSlice = createSlice({
  name: "commands",
  initialState,
  reducers: {
    // setCommands(commands: [])
    setCommands: (state, { payload }) => {
      state.commands = payload;
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

export const { setCommands, setAddCommand, setEditCommand, setDeleteCommand } =
  commandsSlice.actions;

// SELECTORS
export const selectAllCommands = (state) => state.commands.commands;

// export const selectCommandsByCategory =

export const getCommandsFromDB = (): AppThunk => async (dispatch, getState) => {
  const user = getState().userAuth?.userData?.uid;
  const addData = async () => {
    const docSnap: any = await getDocs(
      collection(db, `users/${user}/commands`)
    );
    const commands = docSnap.docs.map((doc) => {
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

export default commandsSlice.reducer;
