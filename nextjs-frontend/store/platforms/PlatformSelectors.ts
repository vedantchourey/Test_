import { RootState } from '../Store';
import Platform from '../../models/Platform';
import { createSelector } from '@reduxjs/toolkit';

export const platformFetchStatusSelector = (state: RootState) => state.platforms.status;
export const allPlatformResponsesSelector = (state: RootState) => state.platforms.allPlatforms;

//Memoized Selectors
export const getAllPlatformsSelector = createSelector([allPlatformResponsesSelector], all => {
  return all.map(x => new Platform(x));
});

const idsSelector = (state: RootState, ids: number[]) => ids;

export const getPlatformsByIds = createSelector([allPlatformResponsesSelector, idsSelector], (all, ids) => {
  return all.reduce((acc, item) => {
    if (ids.indexOf(item.id) !== -1) acc.push(new Platform(item))
    return acc;
  }, [] as Platform[]);
});

