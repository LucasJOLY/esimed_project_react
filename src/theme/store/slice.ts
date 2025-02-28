import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: localStorage.getItem("theme") === "dark",
};

const themeReducer = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem("theme", state.isDark ? "dark" : "light");
    },
  },
});

export const { toggleTheme } = themeReducer.actions;
export default themeReducer.reducer;
