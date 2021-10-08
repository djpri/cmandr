import { UserAuthState } from './../../types/types';
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
  initialized: false,
  isLoggedIn: false,
  errorMessage: null, 
};

export const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setInitialized: (state, { payload }) => {
      state.initialized = payload;
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
export const selectIsLoggedIn = state => state.userAuth?.userData.isLoggedIn;
export const selectUserUid = state => state.userAuth?.userData?.uid || null;
export const selectUserEmail = state => state.userAuth?.userData?.email || null;

// Action creators are generated for each case reducer function
export const { setInitialized, logInUser, createUser, setSignOut, setErrorMessage, setUserData } =
  authSlice.actions;
  
// ASYNC ACTIONS
export const setAuthListener = (): AppThunk => (dispatch, getState) => {
  auth.onAuthStateChanged((user) => {
    console.log(user);
    console.log("auth state changed");
    if (user && getState().userAuth.initialized) {
      dispatch(setUserData(user.toJSON()));
    }
  });
  !getState().userAuth.initialized && dispatch(setInitialized(true));
};

export const submitLoginDetails = (email: string, password: string): AppThunk => async (dispatch, getState) => {
  console.log(email);
  console.log(password);
  try {
    await signInWithEmailAndPassword(auth, email, password)
    dispatch(logInUser());
  } catch (error: any) {
    dispatch(setErrorMessage(`Login Error: ${error.code}`));
  }
};

export const submitNewAccountDetails = (displayName: string, email: string, password: string): AppThunk => async (dispatch, getState) => {
  console.log(email);
  console.log(password);
  try { 
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(logInUser());
    // add document for each new user identified by their uid
    await setDoc(doc(db, "users", user.uid), {
      displayName: displayName,
      email: user.email,
    });
  } catch (error: any) {
    setErrorMessage(`Sign up Error: ${error.code}`);
  }

};

export const signOutUser = (): AppThunk => (dispatch, getState) => {
  signOut(auth);
  dispatch(setSignOut());
};

export default authSlice.reducer;
