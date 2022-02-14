import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabase";
import { AppThunk, RootState } from "../store";

interface UserAuthState {
  userData: any;
  displayName: string | null;
  initialized: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  errorMessage: string | null;
}

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
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
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
export const selectIsInitialized = (state: RootState) =>
  state.userAuth.initialized;
export const selectUserUid = (state: RootState) =>
  state.userAuth?.userData?.id || null;
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
  const user = supabase.auth.user();
  if (user && !getState().userAuth.initialized) {
    dispatch(setUserData(user));
    dispatch(logInUser());
  }

  !getState().userAuth.initialized && dispatch(setInitialized(true));
};

export const submitLoginDetails =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error !== null) {
      dispatch(setErrorMessage(`Login Error: ${error.message}`));
    } else {
      dispatch(logInUser());
      dispatch(setUserData(user));
    }
    dispatch(setIsLoading(false));
  };

export const submitNewAccountDetails =
  (
    userName: string = "",
    email: string = "",
    password: string = ""
  ): AppThunk =>
  async (dispatch) => {
    dispatch(setIsLoading(true));

    const { error } = await supabase.auth.signUp(
      { email, password },
      {
        data: {
          userName,
        },
      }
    );
    dispatch(logInUser());

    if (error !== null)
      dispatch(setErrorMessage(`Sign up Error: ${error.message}`));
    dispatch(setIsLoading(false));
  };

export const signOutUser = (): AppThunk => async (dispatch) => {
  const { error } = await supabase.auth.signOut();
  if (error !== null) {
    dispatch(setErrorMessage(`Sign out Error: ${error.message}`));
  } else {
    dispatch(setErrorMessage(null));
  }
  dispatch(setSignOut());
};

export default authSlice.reducer;
