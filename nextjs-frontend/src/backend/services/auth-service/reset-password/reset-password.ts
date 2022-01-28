import { validateResetPasswordEmail } from "./reset-password-validator";
import { ResetPasswordRequest } from './i-reset-password';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { backendSupabase } from '../../common/supabase-backend-client';
import { ServiceResponse } from "../../common/contracts/service-response";
import backendConfig from "../../../utils/config/backend-config";

function resetPasswordParams(request: ResetPasswordRequest){
    const { email } = request; 
    return email;
}

const { appUrl } = backendConfig.client;

export default async function resetPassword(request: ResetPasswordRequest): Promise<ServiceResponse<ResetPasswordRequest, object>>{
    const errors = await validateResetPasswordEmail(request);
    if (isThereAnyError(errors)) return {errors: errors};
    const email = resetPasswordParams(request);
    const result = await backendSupabase.auth.api.resetPasswordForEmail(email, { redirectTo: appUrl + '/reset-password' });
    if (result.error) return {errors: {apiError: result.error}};
    return {data:  {message: "Email sent successfully."}};
}

