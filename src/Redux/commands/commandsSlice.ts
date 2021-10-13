import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";
import { AppThunk } from "../store";
import { collection, getDocs } from "@firebase/firestore";

const initialState = {
  commands: [],
};

export const commandsSlice = createSlice({
  name: "commands",
  initialState,
  reducers: {
    setCommands: (state, { payload }) => {
      state.commands = payload;
    },
  },
});

export const { setCommands } = commandsSlice.actions;

// SELECTORS
export const selectAllCommands = (state) => state.commands.commands;

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
