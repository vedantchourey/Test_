import { SignupRequest, SignupResponse } from '../../backend-services/auth-service/signup/signup-contracts';
import { post } from '../../../service-clients/fetch-api-wrapper';
import frontEndConfig from '../../../utils/config/front-end-config';
import { NoobServiceErrors } from '../../backend-services/common/contracts/service-response';

const signupUrl = frontEndConfig.noobStormServices.auth.signup;

export type FetchResponse<T> = { isError: true, errors: NoobServiceErrors<T> } | (T & { isError: false });

export async function signUp(request: SignupRequest): Promise<FetchResponse<SignupResponse>> {
  const response = await post(signupUrl, request);
  const body = await response.json();
  if (response.status === 200) return body.data;
  if (response.status === 400) return {errors: body.errors, isError: true}
  throw body;
}
