import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LS_GITHUB_KEY = "github_ls";

interface GithubState {
  favour: string[];
}

const initialState: GithubState = {
  favour: JSON.parse(localStorage.getItem(LS_GITHUB_KEY) ?? "[]"),
};

export const github = createSlice({
  name: "github",
  initialState,
  reducers: {
    addFavourite(state: GithubState, action: PayloadAction<string>) {
      state.favour.push(action.payload);
      localStorage.setItem(LS_GITHUB_KEY, JSON.stringify(state.favour));
    },
    removeFavourite(state: GithubState, action: PayloadAction<string>) {
      state.favour = state.favour.filter((f) => f !== action.payload);
      localStorage.setItem(LS_GITHUB_KEY, JSON.stringify(state.favour));
    },
  },
});

export const githubActions = github.actions;
export const githubReducer = github.reducer;
