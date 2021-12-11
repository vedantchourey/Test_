import { SignupRequest, SignupResponse } from '../../backend-services/auth-service/signup/signup-contracts';
import { post } from '../../../service-clients/fetch-api-wrapper';
import frontEndConfig from '../../../utils/config/front-end-config';
import { FetchResponse } from '../common-messages';

const signupUrl = frontEndConfig.noobStormServices.auth.signup;

export async function signUp(request: SignupRequest): Promise<FetchResponse<SignupRequest, SignupResponse>> {
  const response = await post(signupUrl, request);
  const body = await response.json();
  if (response.status === 200) return body.data;
  if (response.status === 400 && body.errors.apiError == null) return {errors: body.errors, isError: true}
  throw body;
}
