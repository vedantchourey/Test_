import { RootState } from '../../Store';
import { createSelector } from '@reduxjs/toolkit';
import { allGamesResponsesSelector } from '../../games/GameSelectors';
import { allBestOfResponsesSelector } from '../../match-best-of/MatchBestOfSelectors';
import { allMatchFormatResponsesSelector } from '../../match-format/MatchFormatSelectors';
import { allPlatformResponsesSelector } from '../../platforms/PlatformSelectors';
import TournamentDetailsModel from './TournamentDetailsModel';

export const tournamentFetchByIdStatusSelector = (rootState: RootState) => rootState.tournamentDetailsScreen.fetchStatus

const getTournamentResponseSelector = (rootState: RootState) => rootState.tournamentDetailsScreen.tournament;

//Memoized Selectors

export const getTournamentDetailsSelector = createSelector([getTournamentResponseSelector,
                                                          allGamesResponsesSelector,
                                                          allBestOfResponsesSelector,
                                                          allMatchFormatResponsesSelector,
                                                          allPlatformResponsesSelector], (tournament, allGames, allBestOfs, allMatchFormats, allPlatforms) => {
  if (tournament == null) return null;
  return new TournamentDetailsModel(tournament, allGames, allBestOfs, allMatchFormats, allPlatforms)
});



