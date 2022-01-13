import { RootState } from '../redux-store';

export const matchBestOfFetchStatusSelector = (rootState: RootState) => rootState.matchBestOfs.fetchStatus;
export const allMatchBestOfSelector = (rootState: RootState) => rootState.matchBestOfs.bestOfs;
