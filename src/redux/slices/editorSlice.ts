import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

const initialState = {
  code: "",
  theme: "light",
  language: "javascript",
  fontSize: 14,
  readonly: false,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setReadOnly: (state, action) => {
      state.readonly = action.payload;
    },
  },
});

// ACTIONS
export const { setCode, setTheme, setLanguage, setFontSize, setReadOnly } =
  editorSlice.actions;

// SELECTORS
export const selectCode = (state: RootState) => state.editor.code;
export const selectTheme = (state: RootState) => state.editor.theme;
export const selectLanguage = (state: RootState) => state.editor.language;
export const selectFontSize = (state: RootState) => state.editor.fontSize;
export const selectReadOnly = (state: RootState) => state.editor.readonly;

export default editorSlice.reducer;
