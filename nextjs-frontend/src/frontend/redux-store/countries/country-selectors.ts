import { RootState } from '../redux-store';
import { IState } from '../../../backend/services/database/models/i-state';
import { DataFetchStatus } from '../../../models/noob-types';

export const statesFetchStatusSelector = (rootState: RootState): DataFetchStatus => rootState.countries.stateFetchStatus;
export const allStatesSelector = (x: RootState): IState[] => x.countries.states;


