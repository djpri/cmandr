import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    userAuth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
