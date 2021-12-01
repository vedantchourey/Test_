import { RootState } from '../../Store';
import Tournament from '../../../models/tournaments/Tournament';
import { createSelector } from '@reduxjs/toolkit';
import { TournamentResponse } from '../../../service-clients/tournament-service/TournamentResponse';
import { GameResponse } from '../../../service-clients/games-service/GameResponse';

export const filterCriteriaSelector = (rootState: RootState) => rootState.tournamentAdminListScreen.pageFilterCriteria;
export const tournamentsPageFetchStatusSelector = (rootState: RootState) => rootState.tournamentAdminListScreen.listFetchStatus;
//Memoized Selectors

const pageDetailsSelector = (rootState: RootState) => rootState.tournamentAdminListScreen.pageDetails;

export const pageMetaDataSelector = createSelector([pageDetailsSelector], details => {
  const {itemsPerPage, totalCount, data} = details;
  return {itemsPerPage, totalCount, data};
});

const allTournaments = (rootState: RootState) => rootState.tournamentAdminListScreen.pageDetails.data;
const allGames = (rootState: RootState) => rootState.games.allGames;
export const tournamentsForPageSelector = createSelector([allTournaments, allGames], (tournaments: TournamentResponse[], allGames: GameResponse[]) => {
  return tournaments.map(x => new Tournament(x, allGames));
});
