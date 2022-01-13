export type TournamentType = 'SingleElimination' | 'League';

export interface CreateOrEditTournamentRequest {
  name: string;
  gameId: string;
  gameMapId: string;
  platformId: string;
  matchBestOfId: string;
  matchFormatId: string;
  rules: string;
  isTeam: boolean;
  numberOfPlayers: number;
  type: TournamentType;
  scheduledDateTime: string;
}
