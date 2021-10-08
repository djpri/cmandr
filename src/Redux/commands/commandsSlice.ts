import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase/firebase";
import { AppThunk } from "../store";
import { doc, setDoc } from "@firebase/firestore";

const initialState = {
  userData: null,
  initialized: false,
  isLoggedIn: false,
  errorMessage: null, 
};

export const commandsSlice = createSlice({
  name: "commands",
  initialState,
  reducers: {
    setInitialized: (state, { payload }) => {
      state.initialized = payload;
    },
  },
});

// SELECTORS
export const selectIsLoggedIn = state => state.userAuth?.userData.isLoggedIn;

export default commandsSlice.reducer;