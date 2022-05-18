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

function mapToWallet(user: User) {
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
  const errors = await validateSignUp(request, context);
  if (isThereAnyError(errors)) return { errors: errors };

  const { signupParams, metaData } = mapRequiredParams(request);
  const result = await backendSupabase.auth.signUp({ ...signupParams }, metaData);
  if (result.error) return { errors: { apiError: result.error } };

  const transaction = context.transaction as Knex.Transaction;
  const profilesRepository = createProfileRepository(transaction);
  const privateProfilesRepository = new PrivateProfilesRepository(transaction);
  const user = result.user as User;
  const walletRepo = new CrudRepository<IWallet>(transaction, TABLE_NAMES.WALLET);
  await Promise.all([
    profilesRepository.createProfile(mapToProfile(user, request)),
    privateProfilesRepository.createProfile(mapToPrivateProfile(user, request)),
    walletRepo.create(mapToWallet(user))
  ])
  return { data: { userId: result.user?.id } };
}

