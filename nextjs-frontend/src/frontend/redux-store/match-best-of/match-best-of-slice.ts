import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMatchBestOfState } from './i-match-best-of-state';
import { fetchAllMatchBestOfs } from '../../service-clients/match-best-of-service-client';

const initialState: IMatchBestOfState = {
  bestOfs: [],
  error: undefined,
  fetchStatus: 'idle'
};

export const fetchAllMatchBestOfsThunk = createAsyncThunk('matchBestOf/fetchAll', () => {
  return fetchAllMatchBestOfs();
});

const matchBestOfSlice = createSlice({
  name: 'matchBestOf',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllMatchBestOfsThunk.pending, (state) => {
      state.fetchStatus = 'loading';
    });
    builder.addCase(fetchAllMatchBestOfsThunk.fulfilled, (state, action) => {
      state.fetchStatus = 'success';
      state.bestOfs = action.payload;
    });
    builder.addCase(fetchAllMatchBestOfsThunk.rejected, (state, action) => {
      state.fetchStatus = 'error';
      state.error = action.error;
    });
  }
});

const matchBestOfSliceReducer = matchBestOfSlice.reducer;
export default matchBestOfSliceReducer;
