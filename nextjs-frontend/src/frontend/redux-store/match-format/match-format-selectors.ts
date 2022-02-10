import { RootState } from '../redux-store';
import { DataFetchStatus } from '../../../models/noob-types';
import { IMatchFormatResponse } from '../../service-clients/messages/i-match-format-response';

export const matchFormatsFetchStatusSelector = (rootState: RootState): DataFetchStatus => rootState.matchFormats.fetchStatus;
export const allMatchFormatsSelector = (rootState: RootState): IMatchFormatResponse[] => rootState.matchFormats.matchFormats;
