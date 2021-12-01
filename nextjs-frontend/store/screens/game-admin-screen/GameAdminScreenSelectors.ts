import {RootState} from '../../Store';
import Game from '../../../models/Game';
import {createSelector} from '@reduxjs/toolkit';

const stringContainsIgnoreCase = (str1?: string, str2?: string) => {
  if (str1 === str2 || (str1 == null && str2 == null)) return true;
  if ((str1 != null && str2 == null) || (str2 != null && str1 == null)) return false;
  return str1?.toLocaleLowerCase().indexOf(str2!.toLocaleLowerCase()) !== -1;
};

export const searchQuerySelector = (state: RootState) => state.gameAdminScreen.gameSearchQuery;

//Memoized Selectors
const querySelector = (rootState: RootState) => rootState.gameAdminScreen.gameSearchQuery;
const allGamesSelector = (rootState: RootState) => rootState.games.allGames;
export const getFilteredGames = createSelector([allGamesSelector, querySelector], (allGames, query) => {
  if (query === '' || query == null) return allGames.map(x => new Game(x));
  const filterCriteria = query.split(' ');
  const filteredGames = allGames.filter((game) => {
    return filterCriteria.every((criteria) => {
      return stringContainsIgnoreCase(game.name, criteria)
    })
  });
  return filteredGames.map(x => new Game(x));
});


