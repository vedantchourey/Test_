import { SignupRequest, SignupResponse } from '../../backend-services/auth-service/signup/signup-contracts';
import { post } from '../../../service-clients/fetch-api-wrapper';
import frontEndConfig from '../../../utils/config/front-end-config';
import { NoobFetchResponse, SupabaseFetchResponse } from '../common-messages';
import { SignInRequest } from './sign-in-request';
import { frontendSupabase } from '../supabase-frontend-service';
import { Session, User } from '@supabase/gotrue-js/src/lib/types';
import { ApiError } from '@supabase/gotrue-js';
import UserProfileResponse from './user-profile-response';

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


export async function authenticatedUser(): Promise<User | null> {
  return frontendSupabase.auth.user()
}

export async function refreshSession(): Promise<{ data: Session | null; user: User | null; error: ApiError | null }> {
  return frontendSupabase.auth.refreshSession();
}


export function signOut() {
  return frontendSupabase.auth.signOut();
}


export async function fetchUserProfile(): Promise<UserProfileResponse> {
  const user = await authenticatedUser();
  const profiles = await frontendSupabase.from('profiles').select('*').eq('id', user!.id).single();
  return profiles.data as UserProfileResponse;
}
