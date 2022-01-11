import { ValidationResult } from '../../../../common/utils/validation/validator';
import { ApiError } from '@supabase/gotrue-js';

export type NoobServiceErrors<T> = { apiError: ApiError } | ValidationResult<T>;

export function getHttpCode(response: ServiceResponse<any, any>): number {
  if (response.errors == null) return 200;
  if (response.errors.apiError == null) return 400;
  return (response.errors.apiError as ApiError).status;
}


export interface ServiceResponse<TRequest, TResponse> {
  data?: TResponse;
  errors?: NoobServiceErrors<TRequest>;
}
