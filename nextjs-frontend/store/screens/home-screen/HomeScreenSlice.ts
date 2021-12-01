import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import IHomeScreenState, {IHomeScreenFilters} from './IHomeScreenState';
import {searchTournaments} from '../../../service-clients/tournament-service/TournamentService';
import {TournamentPageRequest} from '../../../service-clients/tournament-service/TournamentPageRequest';

export const searchTournamentsForHomeScreenThunk = createAsyncThunk('homeScreen/tournaments', (request: TournamentPageRequest) => {
  return searchTournaments({...request, isOpenedToPublic: true});
});

const initialState: IHomeScreenState = {
  filters: {
    onlyShowMyTournaments: false,
    isEntryFeeRequired: true,
    platforms: []
  },
  tournaments: {
    data: [],
    status: 'idle',
    currentPageNumber: 0,
    itemsPerPage: 1,
    totalCount: 0
  }
};

const homeScreenSlice = createSlice({
  name: 'homeScreen',
  initialState: initialState,
  reducers: {
    updateFiltersReducer: (state, action: PayloadAction<IHomeScreenFilters>) => {
      state.filters = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(searchTournamentsForHomeScreenThunk.pending, (state, action) => {
      state.tournaments.status = 'loading';
    });
    builder.addCase(searchTournamentsForHomeScreenThunk.fulfilled, (state, action) => {
      const {data, totalCount, pageNumber, itemsPerPage} = action.payload;
      state.tournaments = {
        data,
        totalCount: totalCount as number,
        currentPageNumber: pageNumber as number,
        itemsPerPage: itemsPerPage as number,
        status: 'success'
      };
    });
    builder.addCase(searchTournamentsForHomeScreenThunk.rejected, (state, action) => {
      state.tournaments.status = 'error';
      state.error = action.payload;
    });
  }
});

export const {updateFiltersReducer} = homeScreenSlice.actions;
const homeScreenSliceReducer = homeScreenSlice.reducer;
export default homeScreenSliceReducer;