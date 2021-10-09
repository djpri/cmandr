import { UserAuthState } from "./../../types/types";
import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase/firebase";
import { AppThunk } from "../store";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "@firebase/firestore";

const initialState: UserAuthState = {
  userData: null,
  displayName: null,
  initialized: false,
  isLoggedIn: false,
  isLoading: false,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setInitialized: (state, { payload }) => {
      state.initialized = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    logInUser: (state) => {
      state.isLoggedIn = true;
      state.errorMessage = null;
    },
    createUser: (state, { payload }) => {
      state.userData = payload;
    },
    setDisplayName: (state, { payload }) => {
      state.displayName = payload;
    },
    setSignOut: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
    setUserData: (state, { payload }) => {
      state.userData = payload;
    },
  },
});

// SELECTORS
export const selectIsLoggedIn = (state) => state.userAuth?.isLoggedIn;
export const selectIsLoading = (state) => state.userAuth?.isLoading;
export const selectUserUid = (state) => state.userAuth?.userData?.uid || null;
export const selectDisplayName = (state) =>
  state.userAuth?.userData?.displayName;
export const selectUserEmail = (state) =>
  state.userAuth?.userData?.email || null;
export const selectErrorMessage = (state) => state.userAuth.errorMessage;

// Action creators are generated for each case reducer function
export const {
  setInitialized,
  logInUser,
  createUser,
  setSignOut,
  setDisplayName,
  setIsLoading,
  setErrorMessage,
  setUserData,
} = authSlice.actions;

// ASYNC ACTIONS
export const setAuthListener = (): AppThunk => (dispatch, getState) => {
  auth.onAuthStateChanged((user) => {
    console.log(user);
    console.log("auth state changed");
    if (user && getState().userAuth.initialized) {
      dispatch(setUserData(user.toJSON()));
      dispatch(logInUser());
    }
  });
  !getState().userAuth.initialized && dispatch(setInitialized(true));
};

export const getDisplayName = (): AppThunk => (dispatch, getState) => {};

export const submitLoginDetails =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(logInUser());
    } catch (error: any) {
      dispatch(setErrorMessage(`Login Error: ${error.code}`));
    }
    dispatch(setIsLoading(false));
  };

export const submitNewAccountDetails =
  (
    displayName: string = "",
    email: string = "",
    password: string = ""
  ): AppThunk =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(logInUser());
      // add document for each new user identified by their uid
      await setDoc(doc(db, "users", user.uid), {
        displayName: displayName,
        email: user.email,
      });
    } catch (error: any) {
      dispatch(setErrorMessage(`Sign up Error: ${error.code}`));
    }
    dispatch(setIsLoading(false));
  };

export const signOutUser = (): AppThunk => (dispatch) => {
  signOut(auth);
  dispatch(setSignOut());
};

export default authSlice.reducer;
