import { ServiceResponse } from '../../common/contracts/service-response';
import { SignupRequest, SignupResponse } from './signup-contracts';
import { validateSignUp } from './signup-validator';
import { isThereAnyError } from '../../../../utils/validation/validator';
import { frontendSupabase } from '../../../front-end-services/supabase-frontend-service';

export default async function signUp(request: SignupRequest): Promise<ServiceResponse<SignupRequest, SignupResponse>> {
  const errors = await validateSignUp(request);
  if (isThereAnyError(errors)) return {errors: errors};
  const {password, phone, email, provider, ...others} = request;
  const result = await frontendSupabase.auth.signUp({
    password: password,
    phone: phone,
    email: email,
    provider: provider
  }, {
    data: others
  });
  if (result.error) return {errors: {apiError: result.error}}
  return {data: {userId: result.user?.id}};
}

