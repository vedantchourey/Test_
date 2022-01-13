import { RootState } from '../redux-store';

export const statesFetchStatusSelector = (rootState: RootState) => rootState.countries.stateFetchStatus;
export const allStatesSelector = (x: RootState) => x.countries.states;


