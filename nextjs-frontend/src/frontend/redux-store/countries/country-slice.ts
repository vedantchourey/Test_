import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICountryState } from './i-country-state';
import { getAllStates } from '../../service-clients/country-service-client';

export const fetchCountryStatesThunk = createAsyncThunk('countries/fetchStates', (countryIsoCode: string) => {
  return getAllStates(countryIsoCode);
});

const initialState: ICountryState = {
  stateFetchStatus: 'idle',
  states: [],
  error: undefined
}

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountryStatesThunk.pending, (state) => {
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


