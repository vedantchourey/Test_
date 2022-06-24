import { User } from '@supabase/gotrue-js';
import { ServiceResponse } from '../../common/contracts/service-response';
import { SignupRequest, SignupResponse } from './signup-contracts';
import { validateSignUp } from './signup-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { nowAsISOString } from '../../../../common/utils/date-time-utils';
import { createProfileRepository } from '../../database/repositories/profiles-repository';
import { Knex } from 'knex';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { backendSupabase } from '../../common/supabase-backend-client';
import { IProfile } from '../../database/models/i-profile';
import { PrivateProfilesRepository } from '../../database/repositories/private-profiles-repository';
import { IPrivateProfile } from '../../database/models/i-private-profile';
import { CrudRepository } from '../../database/repositories/crud-repository';
import { IWallet } from '../../database/models/i-wallet';
import { TABLE_NAMES } from '../../../../models/constants';
import { IGame } from '../../database/models/i-game';
import { IEloRating } from '../../database/models/i-elo-rating';
import { IEmailTeamInvitation } from '../../database/models/i-email-team-invitation';
import { sendInvites } from '../../team-service';

function mapToProfile(user: User, request: SignupRequest): IProfile {
  const nowAsString = nowAsISOString();
  return {
    id: user.id,
    isPrivate: request.isPrivate,
    username: request.username,
    createdAt: nowAsString,
    updatedAt: nowAsString
  };
}

function mapToPrivateProfile(user: User, request: SignupRequest): IPrivateProfile {
  const nowAsString = nowAsISOString();
  return {
    id: user.id,
    countryId: request.countryId,
    stateId: request.stateId,
    agreeToTnc: request.agreeToTnc,
    dateOfBirth: request.dateOfBirth,
    firstName: request.firstName,
    lastName: request.lastName,
    createdAt: nowAsString,
    updatedAt: nowAsString
  };
}

function mapToWallet(user: User): any {
  return {
    userId: user.id,
    balance: 0
  }
}
type Metadata = { data: { firstName: string; lastName: string; agreeToTnc: boolean; isPrivate: boolean; stateId: string; dateOfBirth: string; countryId: string; username: string } };
type SignupParams = { password: string; phone?: string; provider: "facebook" | "apple" | "google" | undefined; email: string };

function mapRequiredParams(request: SignupRequest): { metaData: Metadata; signupParams: SignupParams } {
  const { password, phone, email, provider, countryId, stateId, agreeToTnc, isPrivate, dateOfBirth, firstName, lastName, username } = request;
  const signupParams = {
    password: password,
    email: email,
    provider: provider
  };
  const metaData = {
    data: {
      countryId,
      stateId,
      agreeToTnc,
      isPrivate,
      dateOfBirth,
      firstName,
      lastName,
      username,
      phone
    }
  };
  return { signupParams, metaData };
}

export default async function signupUser(request: SignupRequest, context: PerRequestContext): Promise<ServiceResponse<SignupRequest, SignupResponse>> {
  const transaction = context.transaction as Knex.Transaction;
  const gameRepo = new CrudRepository<IGame>(transaction, TABLE_NAMES.GAMES);
  const eloRatingRepo = new CrudRepository<IEloRating>(transaction, TABLE_NAMES.ELO_RATING);
  const listOfGame: IGame[] = await gameRepo.knexObj().select("*");

  
  const errors = await validateSignUp(request, context);
  if (isThereAnyError(errors)) return { errors: errors };

  const { signupParams, metaData } = mapRequiredParams(request);
  const result = await backendSupabase.auth.signUp({ ...signupParams }, metaData);
  if (result.error) return { errors: { apiError: result.error } };
  const profilesRepository = createProfileRepository(transaction);
  const privateProfilesRepository = new PrivateProfilesRepository(transaction);
  const user = result.user as User;
  const walletRepo = new CrudRepository<IWallet>(transaction, TABLE_NAMES.WALLET);

  // // add default ELO for all games
  const eloRatingMap = listOfGame.map(async (i) => {
    const find = await eloRatingRepo.find({user_id: user.id, game_id: i.id, elo_rating: 750})
    if(find.length){
      return null
    }
    return eloRatingRepo.create({
      user_id: user.id,
      game_id: i.id
    })
  })

  // check for email invitation
  const emailTeamInvitationRepo = new CrudRepository<IEmailTeamInvitation>(
    transaction,
    TABLE_NAMES.EMAIL_TEAM_INVITATION
  );
  const listOfInvitations: IEmailTeamInvitation[] =
    await emailTeamInvitationRepo.findBy("email_id", request.email);

  const sendInvitesBatch = listOfInvitations.map((i) =>
    sendInvites(
      { team_id: i.team_id, email: i.email_id, player_id: undefined },
      transaction,
      { id: i.invite_by }
    ));

  const sendInvitesResult = Promise.all(sendInvitesBatch);

  console.warn("listOfInvitations -> ", sendInvitesResult);

  await Promise.all(eloRatingMap);
  await Promise.all([
    profilesRepository.createProfile(mapToProfile(user, request)),
    privateProfilesRepository.createProfile(mapToPrivateProfile(user, request)),
    walletRepo.create(mapToWallet(user))
  ])
  return { data: { userId: result.user?.id} };
}

