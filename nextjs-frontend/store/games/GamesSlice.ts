import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IGamesState} from './IGamesState';
import {getAllGames, updateGame} from '../../service-clients/games-service/GameService';
import {ActionReducerMapBuilder} from '@reduxjs/toolkit/src/mapBuilders';
import {GameResponse} from '../../service-clients/games-service/GameResponse';
import Game from '../../models/Game';

export const fetchAllThunk = createAsyncThunk('games/fetchAll', async () => {
  return getAllGames();
});

export const updateThunk = createAsyncThunk('games/update', async (game: Game) => {
  return updateGame(game.id, game.toUpdateRequest())
});

const initialState: IGamesState = {
  allGames: [],
  fetchStatus: 'idle',
  updateStatus: 'idle'
};

const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IGamesState>) => {
    builder.addCase(fetchAllThunk.pending, (state) => {
      state.fetchStatus = 'loading';
    });
    builder.addCase(fetchAllThunk.fulfilled, (state, action: PayloadAction<GameResponse[]>) => {
      state.allGames = action.payload;
      state.fetchStatus = 'success';
    });
    builder.addCase(fetchAllThunk.rejected, (state, action: any) => {
      state.error = action.error;
      state.fetchStatus = 'error';
    });

    builder.addCase(updateThunk.pending, (state) => {
      state.updateStatus = 'loading';
    });
    builder.addCase(updateThunk.fulfilled, (state, action: PayloadAction<GameResponse>) => {
      const otherGames = state.allGames.filter(x => x.id !== action.payload.id);
      state.allGames = [...otherGames, action.payload];
      state.updateStatus = 'success';
    });
    builder.addCase(updateThunk.rejected, (state, action: any) => {
      state.error = action.error;
      state.updateStatus = 'error';
    });
  }
});

const gameSliceReducer = gameSlice.reducer;

export default gameSliceReducer;
