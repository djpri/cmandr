import { UserAuthState } from "./../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase/firebase";
import { AppThunk, RootState } from "../store";
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
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    logInUser: (state) => {
      state.isLoggedIn = true;
      state.errorMessage = null;
    },
    createUser: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
    setSignOut: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
  },
});

// SELECTORS
export const selectIsLoggedIn = (state: RootState) =>
  state.userAuth?.isLoggedIn;
export const selectIsLoading = (state: RootState) => state.userAuth.isLoading;
export const selectUserUid = (state: RootState) =>
  state.userAuth?.userData?.uid || null;
export const selectDisplayName = (state: RootState) =>
  state.userAuth?.userData?.displayName;
export const selectUserEmail = (state: RootState) =>
  state.userAuth?.userData?.email || null;
export const selectErrorMessage = (state: RootState) =>
  state.userAuth.errorMessage;

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
    if (user !== null && getState().userAuth.initialized) {
      dispatch(setUserData(user.toJSON()));
      dispatch(logInUser());
    }
  });
  !getState().userAuth.initialized && dispatch(setInitialized(true));
};

export const submitLoginDetails =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
