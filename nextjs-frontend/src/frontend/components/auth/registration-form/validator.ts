import validator from 'validator';
import { DateTime } from 'luxon';
import { parseDateTime } from '../../../../common/utils/date-time-utils';
import { ValidationResult } from '../../../../common/utils/validation/validator';
import { SignupRequest } from '../../../../backend/services/auth-service/signup/signup-contracts';

function isNullOrEmpty(value: string | undefined | null) {
  if (value == null) return true;
  return validator.isEmpty(value);
}

function validateStateId(details: Partial<SignupRequest>) {
  if (details.stateId == null) return 'Is required';
}

function validateCountry(details: Partial<SignupRequest>) {
  if (details.countryId == null) return 'Is required';
}

function validateDOB(details: Partial<SignupRequest>) {
  if (isNullOrEmpty(details.dateOfBirth)) return 'Is required';
  const dob = parseDateTime(details.dateOfBirth as string);
  if (DateTime.now().diff(dob, 'years').years < 18) return 'Must be 18 years min';
}

function validateEmail(details: Partial<SignupRequest>) {
  if (isNullOrEmpty(details.email)) return 'Is required';
  if (!validator.isEmail(details.email as string)) return 'Invalid email';
}

function validateFirstName(details: Partial<SignupRequest>) {
  if (isNullOrEmpty(details.firstName)) return 'Is required';
  const parts = (details.firstName as string).split(' ');
  if (parts.some(x => !validator.isAlpha(x))) return 'Can only contain A-Za-z';
}

function validateLastName(details: Partial<SignupRequest>) {
  if (isNullOrEmpty(details.lastName)) return 'Is required';
  const parts = (details.lastName as string).split(' ');
  if (parts.some(x => !validator.isAlpha(x))) return 'Can only contain A-Za-z';
}

function validatePassword(details: Partial<SignupRequest>) {
  if (isNullOrEmpty(details.password)) return 'Is required';
  const options = {minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1};
  if (!validator.isStrongPassword(details.password as string, options)) return 'Required min length 8 and at least 1 lower case, upper case, number and special char';
}

function validatePhoneNumber(details: Partial<SignupRequest>) {
  if (isNullOrEmpty(details.phone)) return 'Is required';
  if (!validator.isMobilePhone(details.phone as string, "en-IN")) return 'Invalid mobile number';
}

function validateUserName(details: Partial<SignupRequest>) {
  if (isNullOrEmpty(details.username)) return 'Is required';
  if (!validator.isAlphanumeric(details.username as string)) return 'Only A-Za-z1-9 allowed';
}

function validateTnc(details: Partial<SignupRequest>) {
  if (!details.agreeToTnc) return 'Agreement to terms and conditions required';
}

export async function validateSignUp(obj: Partial<SignupRequest>): Promise<ValidationResult<SignupRequest>> {
  return <ValidationResult<SignupRequest>>{
    stateId: validateStateId(obj),
    password: validatePassword(obj),
    // phone: validatePhoneNumber(obj),
    lastName: validateLastName(obj),
    email: validateEmail(obj),
    firstName: validateFirstName(obj),
    countryId: validateCountry(obj),
    dateOfBirth: validateDOB(obj),
    username: validateUserName(obj),
    agreeToTnc: validateTnc(obj)
  }
}
