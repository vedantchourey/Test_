import { RootState } from '../redux-store';

export const matchFormatsFetchStatusSelector = (rootState: RootState) => rootState.matchFormats.fetchStatus;
export const allMatchFormatsSelector = (rootState: RootState) => rootState.matchFormats.matchFormats;
