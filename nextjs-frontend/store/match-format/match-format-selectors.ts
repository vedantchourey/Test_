import {RootState} from '../redux-store';
import MatchFormat from '../../models/match-format';
import {createSelector} from '@reduxjs/toolkit';

export const matchFormatsFetchStatusSelector = (state: RootState) => state.matchFormats.status;
export const allMatchFormatResponsesSelector = (state: RootState) => state.matchFormats.allMatchFormats;

//Memoized Selectors
export const getAllMatchFormatsSelector = createSelector([allMatchFormatResponsesSelector], all => {
  return all.map(x => new MatchFormat(x));
});

const idsSelector = (state: RootState, ids: number[]) => ids;
export const getMatchFormatByIds = createSelector([allMatchFormatResponsesSelector, idsSelector], (all, ids) => {
  return all.reduce((acc, item) => {
    if (ids.indexOf(item.id) !== -1) acc.push(new MatchFormat(item))
    return acc;
  }, [] as MatchFormat[]);
});
