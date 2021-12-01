import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPlatformState} from './IPlatformState';
import {ActionReducerMapBuilder} from '@reduxjs/toolkit/src/mapBuilders';
import { getAllPlatforms } from '../../service-clients/platforms-service/PlatformService';
import PlatformResponse from '../../service-clients/platforms-service/PlatformResponse';

export const fetchAllPlatforms = createAsyncThunk('platforms/fetchAll', async () => {
  return getAllPlatforms();
});

const initialState: IPlatformState = {
  allPlatforms: [],
  status: 'idle'
};

const platformSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {},
  extraReducers : (builder: ActionReducerMapBuilder<IPlatformState>) => {
    builder.addCase(fetchAllPlatforms.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAllPlatforms.fulfilled, (state, action: PayloadAction<PlatformResponse[]>) => {
      state.allPlatforms = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchAllPlatforms.rejected, (state, action: any) => {
      state.error = action.error;
      state.status = 'error';
    })
  }
});

const platformSliceReducer = platformSlice.reducer;

export default platformSliceReducer;
