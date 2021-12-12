import { ValidationResult } from '../../utils/validation/validator';
import { ApiError } from '@supabase/gotrue-js/src/lib/types';

export type NoobFetchResponse<TRequest, TResponse> = { isError: true, errors: ValidationResult<TRequest> } | (TResponse & { isError: false });
export type SupabaseFetchResponse<TRequest, TResponse> = { isError: true, error: ApiError } | (TResponse & { isError: false }) ;
