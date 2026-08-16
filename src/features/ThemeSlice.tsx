import { createSlice } from "@reduxjs/toolkit";

export type ThemeState = {
  mode: "light" | "dark";
};

const initialState: ThemeState = {
  mode: "light",
};

const updateDOMTheme = (mode: "light" | "dark") => {
  if (mode === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.removeAttribute("data-theme");
  }
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
      updateDOMTheme(state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      updateDOMTheme(action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
