import { validateResetPasswordEmail } from "./reset-password-validator";
import { ResetPasswordRequest, ResetPasswordResponse } from './i-reset-password';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { backendSupabase } from '../../common/supabase-backend-client';
import { ServiceResponse } from "../../common/contracts/service-response";
import backendConfig from "../../../utils/config/backend-config";
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';

const { appUrl } = backendConfig.client;

export default async function resetPassword(request: ResetPasswordRequest, context: PerRequestContext): Promise<ServiceResponse<ResetPasswordRequest, ResetPasswordResponse>> {
  const errors = await validateResetPasswordEmail(request, context);
  if (isThereAnyError(errors)) return { errors: errors };
  const email = request.email;
  const result = await backendSupabase.auth.api.resetPasswordForEmail(email, { redirectTo: appUrl });
  if (result.error) return { errors: { apiError: result.error } };
  return { data: { message: "Email sent successfully." } };
}

