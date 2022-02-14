import { CreateOrEditTournamentRequest } from './create-or-edit-tournament-request';
import { isNullOrEmptyString, ValidationResult } from '../../../common/utils/validation/validator';
import validator from 'validator';
import { isUTCTime, isValidDateTime, parseDateTime } from '../../../common/utils/date-time-utils';
import { GameRepository } from '../database/repositories/game-repository';
import { PerRequestContext } from '../../utils/api-middle-ware/api-middleware-typings';
import { PlatformRepository } from '../database/repositories/platform-repository';
import { MatchFormatRepository } from '../database/repositories/match-format-repository';
import { MatchBestOfRepository } from '../database/repositories/match-best-of-repository';
import { GameMapsRepository } from '../database/repositories/game-maps-repository';
import { Knex } from 'knex';


function validateName(tournament: Partial<CreateOrEditTournamentRequest>): string | undefined {
  if (isNullOrEmptyString(tournament.tournamentName)) return 'Is required';
  if (!validator.isLength(tournament.tournamentName as string, {min: 5})) return 'Min length 5';
}

async function validateGame(tournament: Partial<CreateOrEditTournamentRequest>, gameRepository: GameRepository): Promise<string | undefined> {
  if (isNullOrEmptyString(tournament.gameId)) return 'Is required';
  if ((await gameRepository.getGameById(tournament.gameId as string) == null)) return 'Invalid game';
}

async function validatePlatform(tournament: Partial<CreateOrEditTournamentRequest>, platformRepository: PlatformRepository): Promise<string | undefined> {
  if (isNullOrEmptyString(tournament.gameId)) return;
  if (isNullOrEmptyString(tournament.platformId)) return 'Is required';
  if ((await platformRepository.getById(tournament.platformId as string)) == null) return 'Invalid';
}

function validateNumberOfPlayers(tournament: Partial<CreateOrEditTournamentRequest>) : string | undefined{
  if (tournament.numberOfParticipants == null) return 'Is required';
  if (isNaN(tournament.numberOfParticipants)) return 'Not a valid number';
  if (tournament.numberOfParticipants < 2) return 'Must be 2 or more';
}

function validateIsTeam(tournament: Partial<CreateOrEditTournamentRequest>): string | undefined {
  if (tournament.isTeamParticipating == null) return 'Is Required';
}

async function validateMatchFormat(tournament: Partial<CreateOrEditTournamentRequest>, matchFormatRepository: MatchFormatRepository): Promise<string | undefined> {
  if (isNullOrEmptyString(tournament.formatId)) return 'Is required';
  if ((await matchFormatRepository.getById(tournament.formatId as string)) == null) return 'Invalid';
}

async function validateMatchBestOf(tournament: Partial<CreateOrEditTournamentRequest>, matchBestOfRepository: MatchBestOfRepository): Promise<string | undefined> {
  if (isNullOrEmptyString(tournament.bestOfId)) return 'Is required';
  if ((await matchBestOfRepository.getById(tournament.bestOfId as string)) == null) return 'Invalid';
}

function validateType(tournament: Partial<CreateOrEditTournamentRequest>): string | undefined {
  if (isNullOrEmptyString(tournament.tournamentType)) return 'Is required';
}

function validateScheduleDate(tournament: Partial<CreateOrEditTournamentRequest>): string | undefined {
  if (isNullOrEmptyString(tournament.scheduleDate)) return 'Is required';
  if (!isValidDateTime(tournament.scheduleDate as string)) return 'Invalid';
  if (!isUTCTime(tournament.scheduleDate as string)) return 'Not in UTC';
  const scheduledDateTime = parseDateTime(tournament.scheduleDate as string);
  const diffFromNow = scheduledDateTime.diffNow(['days']);
  if (diffFromNow.days < 5) return 'Must be at least 5 days later';
}

async function validateGameMap(tournament: Partial<CreateOrEditTournamentRequest>, gameMapsRepository: GameMapsRepository): Promise<string | undefined> {
  if (isNullOrEmptyString(tournament.gameId)) return;
  const maps = await gameMapsRepository.getForGame(tournament.gameId as string);
  if (maps.length === 0) return;
  if (isNullOrEmptyString(tournament.mapId)) return 'Is required';
  if (!maps.some((x) => x.id === tournament.mapId)) return 'Invalid map';
}

function validateRules(tournament: Partial<CreateOrEditTournamentRequest>): string | undefined {
  if (isNullOrEmptyString(tournament.rules)) return 'Is required';
  if (!validator.isLength(tournament.rules as string, {min: 20})) return 'Min length 20 chars';
}

export async function validateTournament(tournament: Partial<CreateOrEditTournamentRequest>, context: PerRequestContext): Promise<ValidationResult<CreateOrEditTournamentRequest>> {
  const transaction = context.transaction as Knex.Transaction;
  const gameRepository = new GameRepository(transaction);
  const platformRepository = new PlatformRepository(transaction);
  const matchFormatRepository = new MatchFormatRepository(transaction);
  const matchBestOfRepository = new MatchBestOfRepository(transaction);
  const gameMapsRepository = new GameMapsRepository(transaction);
  return {
    tournamentName: validateName(tournament),
    gameId: await validateGame(tournament, gameRepository),
    platformId: await validatePlatform(tournament, platformRepository),
    numberOfParticipants: validateNumberOfPlayers(tournament),
    isTeamParticipating: validateIsTeam(tournament),
    formatId: await validateMatchFormat(tournament, matchFormatRepository),
    bestOfId: await validateMatchBestOf(tournament, matchBestOfRepository),
    mapId: await validateGameMap(tournament, gameMapsRepository),
    rules: validateRules(tournament),
    tournamentType: validateType(tournament),
    scheduleDate: validateScheduleDate(tournament)
  };
}
