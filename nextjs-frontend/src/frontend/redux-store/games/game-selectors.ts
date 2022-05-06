import { RootState } from "../redux-store";
import { createSelector } from "@reduxjs/toolkit";
import { IGameResponse } from "../../service-clients/messages/i-game-response";
import { DataFetchStatus } from "../../../models/noob-types";

export const gamesFetchStatusSelector = (
  rootState: RootState
): DataFetchStatus => rootState.games.fetchStatus;
export const formatsFetchStatusSelector = (
  rootState: RootState
): DataFetchStatus => rootState.formats.fetchStatus;
export const allGamesSelector = (rootState: RootState): IGameResponse[] =>
  rootState.games.games;
export const allFormatsSelector = (rootState: RootState): any[] =>
  rootState.formats.formats;

// memoized

const platformIdSelector = (
  rootState: RootState,
  platformId: string | undefined
): string | undefined => platformId;

export const gamesByPlatformSelector = createSelector(
  [allGamesSelector, platformIdSelector],
  function (allGames: IGameResponse[], platformId: string | undefined) {
    if (platformId == null) return allGames;
    return allGames.filter((x) => x.platformIds.indexOf(platformId) !== -1);
  }
);
