import { validateUpdatePassword } from "./reset-password-validator";
import { UpdatePasswordRequest, ResetPasswordResponse } from './i-reset-password';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { backendSupabase } from '../../common/supabase-backend-client';
import { ServiceResponse } from "../../common/contracts/service-response";

<<<<<<< HEAD
function updatePasswordParams(request: UpdatePasswordRequest) {
  const { token, password } = request;
  const data = { token, password }
  return { data };
}

export default async function updatePassword(request: UpdatePasswordRequest, context: PerRequestContext): Promise<ServiceResponse<UpdatePasswordRequest, ResetPasswordResponse>> {
  const errors = await validateUpdatePassword(request, context);
  if (isThereAnyError(errors)) return { errors: errors };
  const { data } = updatePasswordParams(request);
  const result = await backendSupabase.auth.api.updateUser(data.token, { password: data.password });
  if (result.error) return { errors: { apiError: result.error } };
  return { data: { message: "Password updated successfully." } }
}
=======

export default async function updatePassword(request: UpdatePasswordRequest): Promise<ServiceResponse<UpdatePasswordRequest, ResetPasswordResponse>> {
  const errors = await validateUpdatePassword(request);
  if (isThereAnyError(errors)) return { errors: errors };
  const result = await backendSupabase.auth.api.updateUser(request.token, { password: request.password });
  if (result.error) return { errors: { apiError: result.error } };
  return { data: { message: "Password updated successfully." } }
}
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
