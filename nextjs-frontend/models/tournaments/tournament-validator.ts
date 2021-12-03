import {Validator} from '../validator';
import {PartialTournament} from './tournament';
import {TournamentTypeCode} from './tournament-type';
import {GameResponse} from '../../service-clients/games-service/game-response';

export const tournamentValidator: Validator<PartialTournament> = {
  tournamentName: (name: string | undefined) => {
    if (name == null || name.trim().length === 0) return 'Is required';
  },
  gameId: (value: number | undefined) => {
    if (value == null) return 'Is required';
  },
  platformId: (value: number | undefined) => {
    if (value == null) return 'Is required';
  },
  bestOfId: (value: number | undefined) => {
    if (value == null) return 'Is required';
  },
  mapId: (value: number | undefined, obj: PartialTournament, context: Map<string, any>) => {
    if (obj.gameId == null) return;
    const allGames = context.get('allGames') as GameResponse[];
    const selectedGame = allGames.filter(x => x.id === obj.gameId)[0];
    const allowedMaps = selectedGame.maps;
    if (allowedMaps.length > 0 && value == null) return 'Is required';
    if (allowedMaps.every(x => x.id !== value)) return 'Invalid map';
  },
  formatId: (value: number | undefined) => {
    if (value == null) return 'Is required';
  },
  scheduleDate: (value: string | undefined) => {
    if (value == null) return 'Is required';
  },
  rules: (value: string | undefined) => {
    if (value == null) return 'Is required';
  },
  isTeamParticipating: (value: boolean | undefined) => {
    if (value == null) return 'Is required';
  },
  numberOfParticipants: (value: number | undefined) => {
    if (value == null) return 'Is required';
    if (isNaN(value)) return 'Is not a number';
    if (value < 2) return 'Cannot have less than two participants';
  },
  tournamentType: (value: TournamentTypeCode | undefined) => {
    if (value == null) return 'Is required';
    if (Object.values(TournamentTypeCode).every(x => x !== value)) return `${value} is not a valid tournament type`;
  }
}

export type TournamentValidator = typeof tournamentValidator;
