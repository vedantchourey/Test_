import { ValidationResult } from '../../../../utils/validation/validator';
import { ApiError } from '@supabase/gotrue-js';

export type NoobServiceErrors<T> = { apiError: ApiError } | ValidationResult<T>;

export interface ServiceResponse<TRequest, TResponse> {
  data?: TResponse;
  errors?: NoobServiceErrors<TRequest>;
}
