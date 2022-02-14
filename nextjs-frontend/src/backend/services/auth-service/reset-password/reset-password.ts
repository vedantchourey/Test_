import { validateResetPasswordEmail } from "./reset-password-validator";
import { ResetPasswordRequest, ResetPasswordResponse } from './i-reset-password';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { backendSupabase } from '../../common/supabase-backend-client';
import { ServiceResponse } from "../../common/contracts/service-response";
import backendConfig from "../../../utils/config/backend-config";
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';

<<<<<<< HEAD
function resetPasswordParams(request: ResetPasswordRequest) {
  const { email } = request;
  return email;
}

=======
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
const { appUrl } = backendConfig.client;

export default async function resetPassword(request: ResetPasswordRequest, context: PerRequestContext): Promise<ServiceResponse<ResetPasswordRequest, ResetPasswordResponse>> {
  const errors = await validateResetPasswordEmail(request, context);
  if (isThereAnyError(errors)) return { errors: errors };
<<<<<<< HEAD
  const email = resetPasswordParams(request);
=======
  const email = request.email;
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
  const result = await backendSupabase.auth.api.resetPasswordForEmail(email, { redirectTo: appUrl });
  if (result.error) return { errors: { apiError: result.error } };
  return { data: { message: "Email sent successfully." } };
}

