import { TournamentType } from '../../tournament-service/tournament-type';

export interface ITournament {
  id: string | undefined;
  tournamentName: string;
  gameId: string;
  platformId: string;
  bestOfId: string;
  mapId: string;
  formatId: string;
  scheduleDate: string;
  rules: string;
  isTeamParticipating: boolean;
  numberOfParticipants: number;
  tournamentType: TournamentType;
  isOpenToPublic: boolean;
}
