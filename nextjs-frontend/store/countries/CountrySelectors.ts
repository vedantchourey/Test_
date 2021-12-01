import { RootState } from '../Store';
import { createSelector } from '@reduxjs/toolkit';
import { StateResponse } from '../../service-clients/country-service/StateResponse';

export const countryStatesFetchStatus = (rootState: RootState) => rootState.countries.stateFetchStatus;

// memoized selectors
const allStates = (x: RootState) => x.countries.states;
const countryId = (x: RootState, countryId: number) => countryId;
export const countryAllStatesSelector = createSelector([allStates, countryId], (states: StateResponse[], countryId: number) => {
  return states.filter(x => x.countryId === countryId);
});
