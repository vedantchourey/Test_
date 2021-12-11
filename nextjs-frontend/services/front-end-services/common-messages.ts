import { ValidationResult } from '../../utils/validation/validator';

export type FetchResponse<TRequest, TResponse> = { isError: true, errors: ValidationResult<TRequest> } | (TResponse & { isError: false });
