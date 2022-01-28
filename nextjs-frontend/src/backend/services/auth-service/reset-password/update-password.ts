import { validateUpdatePassword } from "./reset-password-validator";
import { UpdatePasswordRequest } from './i-reset-password';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { backendSupabase } from '../../common/supabase-backend-client';
import { ServiceResponse } from "../../common/contracts/service-response";

function updatePasswordParams(request: UpdatePasswordRequest){
    const { token, password } = request;
    const data = { token, password }
    return { data };
}

export default async function updatePassword(request: UpdatePasswordRequest): Promise<ServiceResponse<UpdatePasswordRequest, object>>{
    const errors = await validateUpdatePassword(request);
    if(isThereAnyError(errors)) return {errors: errors};
    const { data } = updatePasswordParams(request);
    const result = await backendSupabase.auth.api.updateUser(data.token, { password: data.password });
    if(result.error) return { errors: {apiError: result.error}};
    return {data: {message: "Password updated successfully."}}
}