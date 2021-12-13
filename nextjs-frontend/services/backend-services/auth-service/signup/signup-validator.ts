import validator from 'validator';
import { DateTime } from 'luxon';
import { SignupRequest } from './signup-contracts';
import { parseDateTime } from '../../../../utils/date-time-utils';
import { ValidationResult } from '../../../../utils/validation/validator';
import { searchStatesById } from '../../database/repositories/state-repository';
import { searchCountriesById } from '../../database/repositories/country-repository';
import { countUsersByEmail, countUsersByUserName } from '../../database/repositories/users-repository';


function validateStateId(details: Partial<SignupRequest>) {
  if (details.stateId == null) return 'Is required';
  if (details.countryId == null) return;
  if (searchStatesById(details.stateId, details.countryId).length === 0) return 'Invalid state';
}

function validateCountry(details: Partial<SignupRequest>) {
  if (details.countryId == null) return 'Is required';
  if (searchCountriesById(details.countryId).length === 0) return 'Invalid country';
}


function validateDOB(details: Partial<SignupRequest>) {
  if (details.dateOfBirth == null) return 'Is required';
  const dob = parseDateTime(details.dateOfBirth);
  if (DateTime.now().diff(dob, 'years').years < 18) return 'Must be 18 years min';
}

async function validateEmail(details: Partial<SignupRequest>) {
  if (details.email == null) return 'Is required';
  if (!validator.isEmail(details.email)) return 'Invalid email';
  if ((await countUsersByEmail(details.email)) !== 0) return 'Not available';
}

function validateFirstName(details: Partial<SignupRequest>) {
  if (details.firstName == null) return 'Is required';
  const parts = details.firstName.split(' ');
  if (parts.some(x => !validator.isAlpha(x))) return 'Can only contain A-Za-z';
}

function validateLastName(details: Partial<SignupRequest>) {
  if (details.lastName == null) return 'Is required';
  const parts = details.lastName.split(' ');
  if (parts.some(x => !validator.isAlpha(x))) return 'Can only contain A-Za-z';
}

function validatePassword(details: Partial<SignupRequest>) {
  if (details.password == null) return 'Is required';
  const options = {minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1};
  if (!validator.isStrongPassword(details.password, options)) return 'Required min length 10 and at least 1 lower case, upper case, number and special char';
}

function validatePhoneNumber(details: Partial<SignupRequest>) {
  if (details.phone == null) return 'Is required';
  if (!validator.isMobilePhone(details.phone, "en-IN")) return 'Invalid mobile number';
}

async function validateUserName(details: Partial<SignupRequest>) {
  if (details.username == null) return 'Is required';
  if (!validator.isAlphanumeric(details.username)) return 'Only A-Za-z1-9 allowed';
  if ((await countUsersByUserName(details.username)) !== 0) return 'Not available';
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
    email: await validateEmail(obj),
    firstName: validateFirstName(obj),
    countryId: validateCountry(obj),
    dateOfBirth: validateDOB(obj),
    username: await validateUserName(obj),
    agreeToTnc: validateTnc(obj)
  }
}
