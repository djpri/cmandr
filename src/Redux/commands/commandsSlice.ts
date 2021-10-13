import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase/firebase";
import { AppThunk } from "../store";
import { doc, setDoc } from "@firebase/firestore";

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

// SELECTORS
export const selectIsLoggedIn = (state) => state.userAuth?.userData.isLoggedIn;

export default commandsSlice.reducer;
