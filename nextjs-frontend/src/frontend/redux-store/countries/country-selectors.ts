import { RootState } from '../redux-store';

export const statesFetchStatus = (rootState: RootState) => rootState.countries.stateFetchStatus;
export const allStatesSelector = (x: RootState) => x.countries.states;


