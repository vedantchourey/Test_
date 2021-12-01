import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ITournamentAdminListScreenState} from './ITournamentAdminListScreenState';
import {TournamentPageRequest} from '../../../service-clients/tournament-service/TournamentPageRequest';
import {searchTournaments} from '../../../service-clients/tournament-service/TournamentService';
import {ActionReducerMapBuilder} from '@reduxjs/toolkit/src/mapBuilders';

export const searchTournamentsThunk = createAsyncThunk('tournamentAdminListScreen/fetchPage', (request: TournamentPageRequest) => {
  return searchTournaments(request);
});

const initialState: ITournamentAdminListScreenState = {
  listFetchStatus: 'idle',
  pageDetails: {
    data: [],
  },
  pageFilterCriteria: {
    pageNumber: 0,
    itemsPerPage: 20
  }
};

const tournamentAdminListScreenSlice = createSlice({
  name: 'tournamentAdminListScreen',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ITournamentAdminListScreenState>) => {
    builder.addCase(searchTournamentsThunk.pending, (state, action) => {
      state.pageFilterCriteria = action.meta.arg;
      state.listFetchStatus = 'loading';
    });
    builder.addCase(searchTournamentsThunk.fulfilled, (state, action) => {
      state.pageDetails = action.payload;
      state.listFetchStatus = 'success';
    });
    builder.addCase(searchTournamentsThunk.rejected, (state, action) => {
      state.error = action.error;
      state.listFetchStatus = 'error';
    });
  }
});

const tournamentAdminListScreenSliceReducer = tournamentAdminListScreenSlice.reducer;
export default tournamentAdminListScreenSliceReducer;
