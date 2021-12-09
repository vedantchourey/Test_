import { ServiceResponse } from '../../common/contracts/service-response';
import { SignupRequest, SignupResponse } from './signup-contracts';
import { validateSignUp } from './signup-validator';
import { isThereAnyError } from '../../../../utils/validation/validator';


export default async function signUp(request: SignupRequest): Promise<ServiceResponse<SignupResponse>> {
  const errors = await validateSignUp(request);
  if (isThereAnyError(errors)) return {errors: errors};
  return {data: {}};
}

