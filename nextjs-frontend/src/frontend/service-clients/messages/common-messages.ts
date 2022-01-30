import { ValidationResult } from '../../../common/utils/validation/validator';
import { ApiError } from '@supabase/gotrue-js/src/lib/types';

export type NoobPostResponse<TRequest, TResponse> = { isError: true, errors: ValidationResult<TRequest> } | (TResponse & { isError: false });
export type SupabaseFetchResponse<TResponse> = { isError: true, error: ApiError } | (TResponse & { isError: false }) ;