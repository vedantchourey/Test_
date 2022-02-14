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

function mapToProfile(user: User, request: SignupRequest): IProfile {
  const nowAsString = nowAsISOString();
  return {
    id: user.id,
    countryId: request.countryId,
    stateId: request.stateId,
    agreeToTnc: request.agreeToTnc,
    dateOfBirth: request.dateOfBirth,
    firstName: request.firstName,
    lastName: request.lastName,
    username: request.username,
    createdAt: nowAsString,
    updatedAt: nowAsString
  };
}

type Metadata = { data: { firstName: string; lastName: string; agreeToTnc: boolean; stateId: string; dateOfBirth: string; countryId: string; username: string } };
type SignupParams = { password: string; phone: string; provider: "facebook" | "apple" | "google" | undefined; email: string };

function mapRequiredParams(request: SignupRequest): { metaData: Metadata; signupParams: SignupParams } {
  const {password, phone, email, provider, countryId, stateId, agreeToTnc, dateOfBirth, firstName, lastName, username} = request;
  const signupParams = {
    password: password,
    phone: phone,
    email: email,
    provider: provider
  };
  const metaData = {
    data: {
      countryId,
      stateId,
      agreeToTnc,
      dateOfBirth,
      firstName,
      lastName,
      username
    }
  };
  return {signupParams, metaData};
}

export default async function signupUser(request: SignupRequest, context: PerRequestContext): Promise<ServiceResponse<SignupRequest, SignupResponse>> {
  const errors = await validateSignUp(request, context);
  if (isThereAnyError(errors)) return {errors: errors};
  const {signupParams, metaData} = mapRequiredParams(request);
  const result = await backendSupabase.auth.signUp(signupParams, metaData);
  if (result.error) return {errors: {apiError: result.error}};
  const profilesRepository = createProfileRepository(context.transaction as Knex.Transaction);
  await profilesRepository.createProfile(mapToProfile(result.user as User, request));
  return {data: {userId: result.user?.id}};
}

