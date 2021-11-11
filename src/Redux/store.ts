import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import layoutReducer from "./layout/layoutSlice";
import commandsReducer from "./commands/commandsSlice";
import { useDispatch } from "react-redux";

export const rootReducer = combineReducers({
  layout: layoutReducer,
  commands: commandsReducer,
  userAuth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
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
