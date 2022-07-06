import { SignupRequest, SignupResponse } from '../../backend/services/auth-service/signup/signup-contracts';
import { post } from './fetch-api-wrapper';
import frontEndConfig from '../utils/config/front-end-config';
import { NoobPostResponse, SupabaseFetchResponse } from './messages/common-messages';
import { SignInRequest } from './messages/sign-in-request';
import { frontendSupabase } from '../services/supabase-frontend-service';
import { Session, User } from '@supabase/gotrue-js/src/lib/types';
import { ApiError } from '@supabase/gotrue-js';
import { NewPasswordRequest, NewPasswordResponse, ResetPasswordRequest, ResetPasswordResponse } from './messages/reset-password-request';

const signupUrl = frontEndConfig.noobStormServices.auth.signup;
const resetPasswordUrl = frontEndConfig.noobStormServices.auth.resetPassword;
const sendResetPasswordLinkUrl = frontEndConfig.noobStormServices.auth.sendResetPasswordLink;

export async function signUp(request: SignupRequest): Promise<NoobPostResponse<SignupRequest, SignupResponse>> {
  const response = await post(signupUrl, request);
  const body = await response.json();
  if (response.status === 200) return body.data;
  if (response.status === 400 && body.errors.apiError == null) return {errors: body.errors, isError: true}
  throw body;
}


export async function signIn(request: SignInRequest): Promise<SupabaseFetchResponse<(Session | null)>> {
  const result = await frontendSupabase.auth.signIn({
    email: request.email,
    password: request.password
  });
  
  if (result.error != null) {
    return {isError: true, error: result.error}
  }
  const data = await frontendSupabase
    .from("user_last_seen")
    .select()
    .eq("user_id", result.user?.id);

  if (data.body?.length) {
    await frontendSupabase
      .from("user_last_seen")
      .update({ last_seen: new Date() })
      .eq("user_id", result.user?.id);
  } else {
    await frontendSupabase
      .from("user_last_seen")
      .insert({ user_id: result.user?.id, last_seen: new Date() });
  }
  return {isError: false, ...result.session as Session};
}

export async function resetPassword(request: ResetPasswordRequest): Promise<NoobPostResponse<ResetPasswordRequest, ResetPasswordResponse>> {
  const response = await post(sendResetPasswordLinkUrl, request);
  const body = await response.json();
  if (response.status === 200) return body.data;
  if (response.status === 400 && body.errors.apiError == null) return {errors: body.errors, isError: true}
  throw body;
}

export async function resetPasswordManually(request: NewPasswordRequest): Promise<NoobPostResponse<NewPasswordRequest, NewPasswordResponse>> {
  const response = await post(resetPasswordUrl, request);
  const body = await response.json();
  if (response.status === 200) return body.data;
  if (response.status === 400 && body.errors.apiError == null) return {errors: body.errors, isError: true}
  throw body;
}


export async function authenticatedUser(): Promise<User | null> {
  return frontendSupabase.auth.user()
}

export async function authSession(): Promise<Session | null> {
  return frontendSupabase.auth.session()
}


export async function refreshSession(): Promise<{ data: Session | null; user: User | null; error: ApiError | null }> {
  return frontendSupabase.auth.refreshSession();
}


export function signOut(): Promise<{ error: ApiError | null }> {
  return frontendSupabase.auth.signOut();
}


