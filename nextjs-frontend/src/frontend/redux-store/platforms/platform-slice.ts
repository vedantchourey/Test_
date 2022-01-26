import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPlatformState } from './i-platform-state';
import { fetchAllPlatforms } from '../../service-clients/platform-service-client';

const initialState: IPlatformState = {
  error: undefined,
  platformFetchStatus: 'idle',
  platforms: []
}

export const fetchAllPlatformsThunk = createAsyncThunk('platforms/fetchAll', () => {
  return fetchAllPlatforms();
});

const platformSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPlatformsThunk.pending, (state) => {
      state.platformFetchStatus = 'loading';
    });
    builder.addCase(fetchAllPlatformsThunk.fulfilled, (state, action) => {
      state.platformFetchStatus = 'success';
      state.platforms = action.payload;
    });
    builder.addCase(fetchAllPlatformsThunk.rejected, (state, action) => {
      state.platformFetchStatus = 'error';
      state.error = action.error;
    });
  }
});


const platformSliceReducer = platformSlice.reducer;
export default platformSliceReducer;

