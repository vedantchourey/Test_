import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGameState } from "./i-game-state";
import {
  getAllGames,
  getAllFormats,
} from "../../service-clients/game-service-client";

const initialState: IGameState = {
  error: undefined,
  fetchStatus: "idle",
  games: [],
  formats: [],
};

export const fetchAllGamesThunk = createAsyncThunk("games/fetchAll", () => {
  return getAllGames();
});

export const fetchAllFormats = createAsyncThunk("formats/fetchAll", () => {
  return getAllFormats();
});

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllGamesThunk.pending, (state) => {
      state.fetchStatus = "loading";
    });
    builder.addCase(fetchAllGamesThunk.fulfilled, (state, action) => {
      state.games = action.payload;
      state.fetchStatus = "success";
    });
    builder.addCase(fetchAllGamesThunk.rejected, (state, action) => {
      state.fetchStatus = "error";
      state.error = action.error;
    });
  },
});

const formatSlice = createSlice({
  name: "formats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllFormats.pending, (state) => {
      state.fetchStatus = "loading";
    });
    builder.addCase(fetchAllFormats.fulfilled, (state, action) => {
      state.formats = action.payload;
      state.fetchStatus = "success";
    });
    builder.addCase(fetchAllFormats.rejected, (state, action) => {
      state.fetchStatus = "error";
      state.error = action.error;
    });
  },
});

const gameSliceReducer = gamesSlice.reducer;
const formatSliceReducer = formatSlice.reducer;
export { gameSliceReducer, formatSliceReducer };
