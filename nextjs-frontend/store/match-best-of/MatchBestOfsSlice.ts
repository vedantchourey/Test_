import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IMatchBestOfState} from './IMatchBestOfState';
import {ActionReducerMapBuilder} from '@reduxjs/toolkit/src/mapBuilders';
import {getAllMatchBestOfs} from '../../service-clients/match-best-of-service/MatchBestOfService';
import MatchBestOfResponse from '../../service-clients/match-best-of-service/MatchBestOfResponse';

export const fetchAllMatchBestOfs = createAsyncThunk('matchBestOfs/fetchAll', async () => {
  return getAllMatchBestOfs();
});

const initialState: IMatchBestOfState = {
  allMatchBestOfs: [],
  status: 'idle'
};

const matchBestOfSlice = createSlice({
  name: 'matchBestOfs',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IMatchBestOfState>) => {
    builder.addCase(fetchAllMatchBestOfs.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAllMatchBestOfs.fulfilled, (state, action: PayloadAction<MatchBestOfResponse[]>) => {
      state.allMatchBestOfs = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchAllMatchBestOfs.rejected, (state, action: any) => {
      state.error = action.error;
      state.status = 'error';
    })
  }
});

const matchBestOfSliceReducer = matchBestOfSlice.reducer;

export default matchBestOfSliceReducer;
