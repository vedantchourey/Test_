import {RootState} from '../Store';
import Game from '../../models/Game';
import {createSelector} from '@reduxjs/toolkit';
import {GameResponse} from '../../service-clients/games-service/GameResponse';

export const gameFetchStatusSelector = (state: RootState) => state.games.fetchStatus;
export const gameUpdateStatusSelector = (state: RootState) => state.games.updateStatus;

//Memoized Selectors
export const allGamesResponsesSelector = (x: RootState) => x.games.allGames;
const selectedGameId = (x: RootState, gameId: number | undefined) => gameId;
export const getGameByIdSelector = createSelector([allGamesResponsesSelector, selectedGameId], (games: GameResponse[], gameId: number | undefined) => {
  const game = games.filter(x => x.id === gameId)[0];
  return game == null ? undefined : new Game(game);
});

export const getAllGamesSelector = createSelector([allGamesResponsesSelector], (games) => {
  return games.map(x => new Game(x));
});

