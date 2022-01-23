import { TournamentType } from './tournament-type';

export interface CreateOrEditTournamentRequest {
  id?: string;
  tournamentName: string;
  gameId: string;
  mapId: string;
  platformId: string;
  bestOfId: string;
  formatId: string;
  rules: string;
  isTeamParticipating: boolean;
  numberOfParticipants: number;
  tournamentType: TournamentType;
  scheduleDate: string;
}
