export enum TournamentTypeCode {
  SingleElimination = 'SingleElimination',
  League = 'League',
}

export const tournamentTypes = [
  {code: TournamentTypeCode.League, display: 'League'},
  {code: TournamentTypeCode.SingleElimination, display: 'Single Elimination'}
];

export function getDisplayText(type: TournamentTypeCode) {
  return tournamentTypes.filter(x=>x.code === type)[0].display;
}