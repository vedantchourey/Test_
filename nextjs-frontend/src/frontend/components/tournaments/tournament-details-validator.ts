import { CreateOrEditTournamentRequest } from '../../../backend/services/tournament-service/create-or-edit-tournament-request';
import { isNullOrEmptyString, ValidationResult } from '../../../common/utils/validation/validator';
import validator from 'validator';
import { IGameResponse } from '../../service-clients/messages/i-game-response';
import { parseDateTime } from '../../../common/utils/date-time-utils';


function validateName(tournament: Partial<CreateOrEditTournamentRequest>): string | undefined {
  if (isNullOrEmptyString(tournament.tournamentName)) return 'Is required';
  if (!validator.isLength(tournament.tournamentName as string, {min: 5})) return 'Min length 5';
}

function validateGame(tournament: Partial<CreateOrEditTournamentRequest>): string | undefined {
  if (isNullOrEmptyString(tournament.gameId)) return 'Is required';
}

function validatePlatform(tournament: Partial<CreateOrEditTournamentRequest>): string | undefined {
  if (isNullOrEmptyString(tournament.gameId)) return;
  if (isNullOrEmptyString(tournament.platformId)) return 'Is required';
}

function validateNumberOfPlayers(tournament: Partial<CreateOrEditTournamentRequest>): string | undefined {
  if (tournament.numberOfParticipants == null) return 'Is required';
  if (isNaN(tournament.numberOfParticipants)) return 'Not a valid number';
  if (tournament.numberOfParticipants < 2) return 'Must be 2 or more';
}

function validateIsTeam(tournament: Partial<CreateOrEditTournamentRequest>): string | undefined {
  if (tournament.isTeamParticipating == null) return 'Is Required';
}

function validateMatchFormat(tournament: Partial<CreateOrEditTournamentRequest>): string | undefined {
  if (isNullOrEmptyString(tournament.formatId)) return 'Is required';
}

function validateMatchBestOf(tournament: Partial<CreateOrEditTournamentRequest>): string | undefined {
  if (isNullOrEmptyString(tournament.bestOfId)) return 'Is required';
}

function validateType(tournament: Partial<CreateOrEditTournamentRequest>): string | undefined {
  if (isNullOrEmptyString(tournament.tournamentType)) return 'Is required';
}

function validateScheduleDate(tournament: Partial<CreateOrEditTournamentRequest>): string | undefined {
  if (isNullOrEmptyString(tournament.scheduleDate)) return 'Is required';
  const scheduledDateTime = parseDateTime(tournament.scheduleDate as string);
  const diffFromNow = scheduledDateTime.diffNow(['days']);
  if (diffFromNow.days < 5) return 'Must be at least 5 days later';
}

function validateGameMap(tournament: Partial<CreateOrEditTournamentRequest>, allGames: IGameResponse[]): string | undefined {
  if (isNullOrEmptyString(tournament.gameId)) return;
  const matchingGame = allGames.filter((x) => x.id === tournament.gameId)[0];
  if (matchingGame.gameMaps.length === 0) return;
  if (isNullOrEmptyString(tournament.mapId)) return 'Is required';
  if (!matchingGame.gameMaps.some((x) => x.id === tournament.mapId)) return 'Invalid map';
}

function validateRules(tournament: Partial<CreateOrEditTournamentRequest>): string | undefined {
  if (isNullOrEmptyString(tournament.rules)) return 'Is required';
  if (!validator.isLength(tournament.rules as string, {min: 20})) return 'Min length 20 chars';
}

export function validateTournament(tournament: Partial<CreateOrEditTournamentRequest>, allGames: IGameResponse[]): ValidationResult<CreateOrEditTournamentRequest> {
  return {
    tournamentName: validateName(tournament),
    gameId: validateGame(tournament),
    platformId: validatePlatform(tournament),
    numberOfParticipants: validateNumberOfPlayers(tournament),
    isTeamParticipating: validateIsTeam(tournament),
    formatId: validateMatchFormat(tournament),
    bestOfId: validateMatchBestOf(tournament),
    mapId: validateGameMap(tournament, allGames),
    rules: validateRules(tournament),
    tournamentType: validateType(tournament),
    scheduleDate: validateScheduleDate(tournament)
  };
}
