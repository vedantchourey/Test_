import { ServiceResponse } from '../../common/contracts/service-response';
import { SignupRequest, SignupResponse } from './signup-contracts';
import { validateSignUp } from './signup-validator';
import { isThereAnyError } from '../../../../utils/validation/validator';
import { frontendSupabase } from '../../../front-end-services/supabase-frontend-service';
import { createProfile } from '../../database/repositories/profiles-repository';
import { User } from '@supabase/gotrue-js';
import { nowAsISOString } from '../../../../utils/date-time-utils';

function mapToProfile(user: User, request: SignupRequest) {
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

export default async function signupUser(request: SignupRequest): Promise<ServiceResponse<SignupRequest, SignupResponse>> {
  const errors = await validateSignUp(request);
  if (isThereAnyError(errors)) return {errors: errors};
  const {password, phone, email, provider, countryId, stateId, agreeToTnc, dateOfBirth, firstName, lastName, username} = request;
  const result = await frontendSupabase.auth.signUp({
    password: password,
    phone: phone,
    email: email,
    provider: provider
  }, {
    data: {
      countryId,
      stateId,
      agreeToTnc,
      dateOfBirth,
      firstName,
      lastName,
      username
    }
  });
  if (result.error) return {errors: {apiError: result.error}}
  await createProfile(mapToProfile(result.user!, request))
  return {data: {userId: result.user?.id}};
}

