import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IGameState } from './i-game-state';
import { getAllGames } from '../../service-clients/game-service';

const initialState: IGameState = {
  error: undefined,
  fetchStatus: 'idle',
  games: []
};

export const fetchAllGamesThunk = createAsyncThunk('games/fetchAll', () => {
  return getAllGames();
});

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllGamesThunk.pending, (state, action) => {
      state.fetchStatus = 'loading';
    });
    builder.addCase(fetchAllGamesThunk.fulfilled, (state, action) => {
      state.games = action.payload;
      state.fetchStatus = 'success';
    });
    builder.addCase(fetchAllGamesThunk.rejected, (state, action) => {
      state.fetchStatus = 'error';
      state.error = action.error;
    });
  },
});

const gameSliceReducer = gamesSlice.reducer;
export default gameSliceReducer;
