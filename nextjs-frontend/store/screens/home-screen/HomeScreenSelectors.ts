import {RootState} from '../../Store';
import {TournamentCardModel} from '../../../components/screens/home/TournamentCardModel';
import {createSelector} from '@reduxjs/toolkit';

export const homeScreenFiltersSelector = (rootState: RootState) => rootState.homeScreen.filters;
//Memoized Selectors

const homeScreenTournaments = (rootState: RootState) => rootState.homeScreen.tournaments.data;
const allGamesSelector = (rootState: RootState) => rootState.games.allGames;

export const homeScreenTournamentsSelector = createSelector([homeScreenTournaments, allGamesSelector], (allTournaments, allGames) => {
  return allTournaments.map(x => new TournamentCardModel(x, allGames));
});


