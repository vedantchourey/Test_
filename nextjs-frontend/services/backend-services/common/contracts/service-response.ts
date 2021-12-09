import { ErrorResponse } from './error-response';
import { ValidationResult } from '../../../../utils/validation/validator';

export interface ServiceResponse<T> {
  data?: T;
  errors?: ErrorResponse[] | ValidationResult<T>;
}
