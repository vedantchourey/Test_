import { CreateOrEditTournamentRequest } from '../../../backend/services/tournament-service/create-or-edit-tournament-request';
import { isNullOrEmptyString, ValidationResult } from '../../../common/utils/validation/validator';
import validator from 'validator';


function validateName(tournament: Partial<CreateOrEditTournamentRequest>) {
  if (isNullOrEmptyString(tournament.name)) return 'Is required';
  if (!validator.isLength(tournament.name!, {min: 5})) return 'Min length 5';
}

function validateGame(tournament: Partial<CreateOrEditTournamentRequest>) {
  if (isNullOrEmptyString(tournament.gameId)) return 'Is required';
}

function validatePlatform(tournament: Partial<CreateOrEditTournamentRequest>) {
  if (isNullOrEmptyString(tournament.platformId)) return 'Is required';
}

export function validateTournament(tournament: Partial<CreateOrEditTournamentRequest>): ValidationResult<CreateOrEditTournamentRequest> {
  return {
    name: validateName(tournament),
    gameId: validateGame(tournament),
    platformId: validatePlatform(tournament)
  };
}
