import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMatchFormatState } from './i-match-format-state';
import { fetchAllMatchFormats } from '../../service-clients/match-format-service-client';

const initialState: IMatchFormatState = {
  matchFormats: [],
  error: undefined,
  fetchStatus: 'idle'
};

export const fetchAllMatchFormatsThunk = createAsyncThunk('matchFormat/fetchAll', () => {
  return fetchAllMatchFormats();
});

const matchFormatSlice = createSlice({
  name: 'matchFormat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllMatchFormatsThunk.pending, (state) => {
      state.fetchStatus = 'loading';
    });
    builder.addCase(fetchAllMatchFormatsThunk.fulfilled, (state, action) => {
      state.fetchStatus = 'success';
      state.matchFormats = action.payload;
    });
    builder.addCase(fetchAllMatchFormatsThunk.rejected, (state, action) => {
      state.fetchStatus = 'error';
      state.error = action.error;
    });
  }
});

const matchFormatSliceReducer = matchFormatSlice.reducer;
export default matchFormatSliceReducer;
