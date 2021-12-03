import { RootState } from '../redux-store';
import MatchBestOf from '../../models/match-best-of';
import { createSelector } from '@reduxjs/toolkit';

export const matchBestOfFetchStatusSelector = (state: RootState) => state.matchBestOf.status;
export const allBestOfResponsesSelector = (state: RootState) => state.matchBestOf.allMatchBestOfs;

//Memoized Selectors

export const getAllMatchBestOfSelector = createSelector([allBestOfResponsesSelector], (all) => {
  return all.map(x => new MatchBestOf(x));
});

const selectorIds = (state: RootState, ids: number[]) => ids;
export const getMatchBestByIds = createSelector([allBestOfResponsesSelector, selectorIds], (all, ids) => {
  return all.reduce((acc, item) => {
    if (ids.indexOf(item.id) !== -1) acc.push(new MatchBestOf(item))
    return acc;
  }, [] as MatchBestOf[]);
});



