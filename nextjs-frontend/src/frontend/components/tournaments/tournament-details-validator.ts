import { CreateOrEditTournamentRequest } from '../../../backend/services/tournament-service/create-or-edit-tournament-request';
import { isNullOrEmptyString, ValidationResult } from '../../../common/utils/validation/validator';
import validator from 'validator';
import { IGameResponse } from '../../service-clients/messages/i-game-response';
import { parseDateTime } from '../../../common/utils/date-time-utils';
import { DateTime } from 'luxon';


function validateName(tournament: Partial<CreateOrEditTournamentRequest>) {
  if (isNullOrEmptyString(tournament.name)) return 'Is required';
  if (!validator.isLength(tournament.name!, {min: 5})) return 'Min length 5';
}

function validateGame(tournament: Partial<CreateOrEditTournamentRequest>) {
  if (isNullOrEmptyString(tournament.gameId)) return 'Is required';
}

function validatePlatform(tournament: Partial<CreateOrEditTournamentRequest>) {
  if (isNullOrEmptyString(tournament.gameId)) return;
  if (isNullOrEmptyString(tournament.platformId)) return 'Is required';
}

function validateNumberOfPlayers(tournament: Partial<CreateOrEditTournamentRequest>) {
  if (tournament.numberOfPlayers == null) return 'Is required';
  if (isNaN(tournament.numberOfPlayers)) return 'Not a valid number';
  if (tournament.numberOfPlayers < 2) return 'Must be 2 or more';
}

function validateIsTeam(tournament: Partial<CreateOrEditTournamentRequest>) {
  if (tournament.isTeam == null) return 'Is Required';
}

function validateMatchFormat(tournament: Partial<CreateOrEditTournamentRequest>) {
  if (isNullOrEmptyString(tournament.matchFormatId)) return 'Is required';
}

function validateMatchBestOf(tournament: Partial<CreateOrEditTournamentRequest>) {
  if (isNullOrEmptyString(tournament.matchBestOfId)) return 'Is required';
}

function validateType(tournament: Partial<CreateOrEditTournamentRequest>) {
  if (isNullOrEmptyString(tournament.type)) return 'Is required';
}

function validateScheduleDate(tournament: Partial<CreateOrEditTournamentRequest>) {
  if (isNullOrEmptyString(tournament.scheduledDateTime)) return 'Is required';
  const scheduledDateTime = parseDateTime(tournament.scheduledDateTime!);
  const diffFromNow = scheduledDateTime.diff(DateTime.now());
  if (diffFromNow.hours < 2) return 'Must be at least 2 hours later';
}

function validateGameMap(tournament: Partial<CreateOrEditTournamentRequest>, allGames: IGameResponse[]) {
  if (isNullOrEmptyString(tournament.gameId)) return;
  const matchingGame = allGames.filter(x => x.id === tournament.gameId)[0];
  if (matchingGame.gameMaps.length === 0 && !isNullOrEmptyString(tournament.gameMapId)) return 'Game does not have a map';
  if (!matchingGame.gameMaps.some(x => x.id === tournament.gameMapId)) return 'Invalid map';
}

function validateRules(tournament: Partial<CreateOrEditTournamentRequest>) {
  if (isNullOrEmptyString(tournament.rules)) return 'Is required';
  if (validator.isLength(tournament.rules!, {min: 20})) return 'Min length 20 chars';
}

export function validateTournament(tournament: Partial<CreateOrEditTournamentRequest>, allGames: IGameResponse[]): ValidationResult<CreateOrEditTournamentRequest> {
  return {
    name: validateName(tournament),
    gameId: validateGame(tournament),
    platformId: validatePlatform(tournament),
    numberOfPlayers: validateNumberOfPlayers(tournament),
    isTeam: validateIsTeam(tournament),
    matchFormatId: validateMatchFormat(tournament),
    matchBestOfId: validateMatchBestOf(tournament),
    gameMapId: validateGameMap(tournament, allGames),
    rules: validateRules(tournament),
    type: validateType(tournament),
    scheduledDateTime: validateScheduleDate(tournament)
  };
}
