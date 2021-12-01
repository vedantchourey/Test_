import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICountryState } from './ICountryState';
import { getAllStates } from '../../service-clients/country-service/CountryService';

export const fetchCountryStatesThunk = createAsyncThunk('countries/fetchStates', (countryId: number) => {
  return getAllStates(countryId);
});

const initialState: ICountryState = {
  countryFetchStatus: 'idle',
  stateFetchStatus: 'idle',
  states: [],
  countries: [],
  error: undefined
}

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountryStatesThunk.pending, state => {
      state.stateFetchStatus = 'loading';
    });
    builder.addCase(fetchCountryStatesThunk.fulfilled, (state, action) => {
      state.stateFetchStatus = 'success';
      state.states = action.payload;
    });
    builder.addCase(fetchCountryStatesThunk.rejected, (state, action) => {
      state.stateFetchStatus = 'error';
      state.error = action.error;
    });
  }
});

const countrySliceReducer = countrySlice.reducer;

export default countrySliceReducer;


