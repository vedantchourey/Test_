import { RootState } from '../redux-store';
import { DataFetchStatus } from '../../../models/noob-types';
import { IMatchBestOfResponse } from '../../service-clients/messages/i-match-best-of-response';

export const matchBestOfFetchStatusSelector = (rootState: RootState): DataFetchStatus => rootState.matchBestOfs.fetchStatus;
export const allMatchBestOfSelector = (rootState: RootState): IMatchBestOfResponse[] => rootState.matchBestOfs.bestOfs;
