import validator from 'validator';
import { DateTime } from 'luxon';
import { SignupRequest } from './signup-contracts';
import { parseDateTime } from '../../../../common/utils/date-time-utils';
import { ValidationResult } from '../../../../common/utils/validation/validator';
import { CountryRepository, createCountryRepository } from '../../database/repositories/country-repository';
import { Knex } from 'knex';
import { createStateRepository, StateRepository } from '../../database/repositories/state-repository';
import { createUsersRepository, UsersRepository } from '../../database/repositories/users-repository';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';

function isNullOrEmpty(value: string | undefined | null) {
  if (value == null) return true;
  return validator.isEmpty(value);
}

async function validateStateId(details: Partial<SignupRequest>, stateRepository: StateRepository) {
  if (isNullOrEmpty(details.stateId)) return 'Is required';
  if (details.countryId == null) return;
  if ((await stateRepository.getStateById(details.stateId as string, details.countryId)) == null) return 'Invalid state';
}

async function validateCountry(details: Partial<SignupRequest>, repository: CountryRepository) {
  if (isNullOrEmpty(details.countryId)) return 'Is required';
  if ((await repository.getCountryById(details.countryId as string)) == null) return 'Invalid country';
}

function validateDOB(details: Partial<SignupRequest>) {
  if (isNullOrEmpty(details.dateOfBirth)) return 'Is required';
  const dob = parseDateTime(details.dateOfBirth as string);
  if (DateTime.now().diff(dob, 'years').years < 18) return 'Must be 18 years min';
}

async function validateEmail(details: Partial<SignupRequest>, usersRepository: UsersRepository) {
  if (isNullOrEmpty(details.email)) return 'Is required';
  if (!validator.isEmail(details.email as string)) return 'Invalid email';
  if ((await usersRepository.countUsersByEmail(details.email as string)) !== 0) return 'Not available';
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
  if (!validator.isStrongPassword(details.password as string, options)) return 'Required min length 10 and at least 1 lower case, upper case, number and special char';
}

function validatePhoneNumber(details: Partial<SignupRequest>) {
  if (isNullOrEmpty(details.phone)) return 'Is required';
  if (!validator.isMobilePhone(details.phone as string, "en-IN")) return 'Invalid mobile number';
}

async function validateUserName(details: Partial<SignupRequest>, usersRepository: UsersRepository) {
  if (isNullOrEmpty(details.username)) return 'Is required';
  if (!validator.isAlphanumeric(details.username as string)) return 'Only A-Za-z1-9 allowed';
  if ((await usersRepository.countUsersByUserName(details.username as string)) !== 0) return 'Not available';
}

function validateTnc(details: Partial<SignupRequest>) {
  if (!details.agreeToTnc) return 'Agreement to terms and conditions required';
}

export async function validateSignUp(obj: Partial<SignupRequest>, context: PerRequestContext): Promise<ValidationResult<SignupRequest>> {
  const transaction = context.transaction as Knex.Transaction;
  const countryRepository = createCountryRepository(transaction);
  const stateRepository = createStateRepository(transaction);
  const usersRepository = createUsersRepository(transaction);

  return <ValidationResult<SignupRequest>>{
    stateId: await validateStateId(obj, stateRepository),
    password: validatePassword(obj),
    // phone: validatePhoneNumber(obj),
    lastName: validateLastName(obj),
    email: await validateEmail(obj, usersRepository),
    firstName: validateFirstName(obj),
    countryId: await validateCountry(obj, countryRepository),
    dateOfBirth: validateDOB(obj),
    username: await validateUserName(obj, usersRepository),
    agreeToTnc: validateTnc(obj)
  }
}
