import { SignupRequest, SignupResponse } from '../../backend-services/auth-service/signup/signup-contracts';
import { post } from '../../../service-clients/fetch-api-wrapper';
import frontEndConfig from '../../../utils/config/front-end-config';
import { NoobFetchResponse, SupabaseFetchResponse } from '../common-messages';
import { SignInRequest } from './sign-in-request';
import { frontendSupabase } from '../supabase-frontend-service';
import { Session } from '@supabase/gotrue-js/src/lib/types';

const signupUrl = frontEndConfig.noobStormServices.auth.signup;

export async function signUp(request: SignupRequest): Promise<NoobFetchResponse<SignupRequest, SignupResponse>> {
  const response = await post(signupUrl, request);
  const body = await response.json();
  if (response.status === 200) return body.data;
  if (response.status === 400 && body.errors.apiError == null) return {errors: body.errors, isError: true}
  throw body;
}


export async function signIn(request: SignInRequest): Promise<SupabaseFetchResponse<SignInRequest, (Session | null)>> {
  const result = await frontendSupabase.auth.signIn({
    email: request.email,
    password: request.password
  });
  if (result.error != null) {
    return {isError: true, error: result.error}
  } else {
    return {isError: false, ...result.session} as any;
  }
}
