import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ITournamentDetailsScreenState from './ITournamentDetailsScreenState';
import { getTournamentById } from '../../../service-clients/tournament-service/TournamentService';

export const fetchTournamentByIdThunk = createAsyncThunk('tournamentDetailsScreen/fetchTournamentById', (id: number, thunkAPI) => {
  return getTournamentById(id);
});


const initialState: ITournamentDetailsScreenState = {
  fetchStatus: 'idle',
  tournament: undefined
}

const tournamentDetailsScreenSlice = createSlice({
  name: 'tournamentDetailsScreen',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTournamentByIdThunk.pending, (state, action) => {
      state.fetchStatus = 'loading';
    });
    builder.addCase(fetchTournamentByIdThunk.fulfilled, (state, action) => {
      state.tournament = action.payload;
      state.fetchStatus = 'success';
    });
    builder.addCase(fetchTournamentByIdThunk.rejected, (state, action) => {
      state.error = action.error;
      state.fetchStatus = 'error';
    });
  }
});


const tournamentDetailsScreenSliceReducer = tournamentDetailsScreenSlice.reducer;

export default tournamentDetailsScreenSliceReducer;
