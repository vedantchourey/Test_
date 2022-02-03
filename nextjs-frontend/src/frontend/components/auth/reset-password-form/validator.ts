import validator from 'validator';
import { ValidationResult } from '../../../../common/utils/validation/validator';
import { NewPasswordRequest, ResetPasswordRequest } from '../../../../backend/services/auth-service/reset-password/reset-password-contracts';

function isNullOrEmpty(value: string | undefined | null) {
  if (value == null) return true;
  return validator.isEmpty(value);
}

function validateEmail(details: Partial<ResetPasswordRequest>) {
  if (details.phone) return;
  if (isNullOrEmpty(details.email)) return 'Is required';
  if (!validator.isEmail(details.email as string)) return 'Invalid email';
}

function validateCode(obj: Partial<NewPasswordRequest>) {
  if (isNullOrEmpty(obj.code)) return 'Is required';
  const parts = (obj.code as string).split(' ');
  if (parts.some(x => !validator.isAlphanumeric(x))) return 'Can only contain A-Za-z0-9';
}

function validatePassword(obj: Partial<NewPasswordRequest>) {
  if (isNullOrEmpty(obj.password)) return 'Is required';
  const options = { minLength: 12, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 };
  if (!validator.isStrongPassword(obj.password as string, options)) return 'Required min length 12 and at least 1 lower case, upper case, number and special char';
}

function validateConfirmPassword(obj: Partial<NewPasswordRequest>) {
  if (isNullOrEmpty(obj.confirm_password)) return 'Is required';
  if (obj.password != obj.confirm_password) return "Password disn't match";
}

function validatePhoneNumber(details: Partial<ResetPasswordRequest>) {
  if (details.email) return;
  if (isNullOrEmpty(details.phone)) return 'Is required';
  if (!validator.isMobilePhone(details.phone as string, "en-IN")) return 'Invalid mobile number';
}

export async function validateResetPassword(obj: Partial<ResetPasswordRequest>): Promise<ValidationResult<ResetPasswordRequest>> {
  return <ValidationResult<ResetPasswordRequest>>{
    phone: validatePhoneNumber(obj),
    email: validateEmail(obj)
  }
}

export async function validateNewPasswordInputs(obj: Partial<NewPasswordRequest>): Promise<ValidationResult<NewPasswordRequest>> {
  return <ValidationResult<NewPasswordRequest>>{
    password: validatePassword(obj),
    confirm_password: validateConfirmPassword(obj)
  }
}