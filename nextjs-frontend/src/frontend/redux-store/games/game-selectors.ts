import { RootState } from '../redux-store';
import { createSelector } from '@reduxjs/toolkit';
import { IGameResponse } from '../../service-clients/messages/i-game-response';

export const gamesFetchStatusSelector = (rootState: RootState) => rootState.games.fetchStatus;
export const allGamesSelector = (rootState: RootState) => rootState.games.games;

// memoized

const platformIdSelector = (rootState: RootState, platformId: string | undefined) => platformId;

export const gamesByPlatformSelector = createSelector([allGamesSelector, platformIdSelector], function (allGames: IGameResponse[], platformId: string | undefined) {
  if (platformId == null) return allGames;
  return allGames.filter((x) => x.platformIds.indexOf(platformId) !== -1);
});
