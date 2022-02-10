import { validateUpdatePassword } from "./reset-password-validator";
import { UpdatePasswordRequest, ResetPasswordResponse } from './i-reset-password';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { backendSupabase } from '../../common/supabase-backend-client';
import { ServiceResponse } from "../../common/contracts/service-response";


export default async function updatePassword(request: UpdatePasswordRequest): Promise<ServiceResponse<UpdatePasswordRequest, ResetPasswordResponse>> {
  const errors = await validateUpdatePassword(request);
  if (isThereAnyError(errors)) return { errors: errors };
  const result = await backendSupabase.auth.api.updateUser(request.token, { password: request.password });
  if (result.error) return { errors: { apiError: result.error } };
  return { data: { message: "Password updated successfully." } }
}
