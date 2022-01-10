import { RootState } from '../redux-store';
import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../services/backend-services/database/repositories/state-repository';

export const statesFetchStatus = (rootState: RootState) => rootState.countries.stateFetchStatus;
export const allStatesSelector = (x: RootState) => x.countries.states;


