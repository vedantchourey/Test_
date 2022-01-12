import { RootState } from '../redux-store';
import { createSelector } from '@reduxjs/toolkit';
import { IPlatform } from '../../../backend/services/database/models/i-platform';

export const getAllPlatformsSelector = (rootState: RootState) => rootState.platforms.platforms;
export const getAllPlatformsStatusSelector = (rootState: RootState) => rootState.platforms.platformFetchStatus;

// memoized

export const platformIdsSelector = (rootState: RootState, allowedPlatformIds: string[]) => allowedPlatformIds;

export const platformsByIdsSelector = createSelector([getAllPlatformsSelector, platformIdsSelector], (allPlatforms: IPlatform[], allowedPlatformIds: string[]) => {
  return allPlatforms.filter(x => allowedPlatformIds.indexOf(x.id) !== -1);
});
