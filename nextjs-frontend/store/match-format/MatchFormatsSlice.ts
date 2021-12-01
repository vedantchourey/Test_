import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IMatchFormatsState} from './IMatchFormatsState';
import {ActionReducerMapBuilder} from '@reduxjs/toolkit/src/mapBuilders';
import {getAllMatchFormats} from '../../service-clients/match-format-service/MatchFormatService';
import MatchFormatResponse from '../../service-clients/match-format-service/MatchFormatResponse';

export const fetchAllMatchFormats = createAsyncThunk('matchFormats/fetchAll', async () => {
  return getAllMatchFormats();
});

const initialState: IMatchFormatsState = {
  allMatchFormats: [],
  status: 'idle'
};

const matchFormatSlice = createSlice({
  name: 'matchFormats',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IMatchFormatsState>) => {
    builder.addCase(fetchAllMatchFormats.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAllMatchFormats.fulfilled, (state, action: PayloadAction<MatchFormatResponse[]>) => {
      state.allMatchFormats = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchAllMatchFormats.rejected, (state, action: any) => {
      state.error = action.error;
      state.status = 'error';
    })
  }
});

const matchFormatSliceReducer = matchFormatSlice.reducer;

export default matchFormatSliceReducer;
