import validator from 'validator';
import { NewPasswordRequest, ResetPasswordRequest } from './reset-password-contracts';
import { isNullOrEmptyString, ValidationResult } from '../../../../common/utils/validation/validator';
import { CountryRepository, createCountryRepository } from '../../database/repositories/country-repository';
import { Knex } from 'knex';
import { createStateRepository, StateRepository } from '../../database/repositories/state-repository';
import { createUsersRepository, UsersRepository } from '../../database/repositories/users-repository';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';

async function validateEmail(obj: Partial<NewPasswordRequest>, usersRepository: UsersRepository) {
    if (isNullOrEmptyString(obj.email)) return 'Is required';
    if (!validator.isEmail(obj.email as string)) return 'Invalid email';
    if ((await usersRepository.countUsersByEmail(obj.email as string)) === 0) return "Email does not Exists";
}

function validateCode(obj: Partial<NewPasswordRequest>) {
    if (isNullOrEmptyString(obj.code)) return 'Is required';
    const parts = (obj.code as string).split(' ');
    if (parts.some(x => !validator.isAlphanumeric(x))) return 'Can only contain A-Za-z0-9';
}

function validatePassword(obj: Partial<NewPasswordRequest>) {
    if (isNullOrEmptyString(obj.new_password)) return 'Is required';
    const options = { minLength: 12, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 };
    if (!validator.isStrongPassword(obj.new_password as string, options)) return 'Required min length 10 and at least 1 lower case, upper case, number and special char';
}

function validatePhoneNumber(obj: Partial<ResetPasswordRequest>) {
    if (isNullOrEmptyString(obj.phone)) return 'Is required';
    if (!validator.isMobilePhone(obj.phone as string, "en-IN")) return 'Invalid mobile number';
}

export async function validateNewPassword(obj: Partial<NewPasswordRequest>, context: PerRequestContext): Promise<ValidationResult<NewPasswordRequest>> {
    const transaction = context.transaction as Knex.Transaction;
    const usersRepository = createUsersRepository(transaction);

    return <ValidationResult<NewPasswordRequest>>{
        password: validatePassword(obj),
        email: await validateEmail(obj, usersRepository),
        code: validateCode(obj)
    }
}

export async function validateInputs(obj: Partial<NewPasswordRequest>, context: PerRequestContext): Promise<ValidationResult<NewPasswordRequest>> {
    const transaction = context.transaction as Knex.Transaction;
    const usersRepository = createUsersRepository(transaction);

    return <ValidationResult<NewPasswordRequest>>{
        password: validatePassword(obj),
        // phone: validatePhoneNumber(obj),
        email: await validateEmail(obj, usersRepository),
        code: validateCode(obj)
    }
}
