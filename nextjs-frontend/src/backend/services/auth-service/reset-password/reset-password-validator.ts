import validator from 'validator';
import { isNullOrEmptyString, ValidationResult } from '../../../../common/utils/validation/validator';
import { ResetPasswordRequest, UpdatePasswordRequest } from './i-reset-password';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { Knex } from 'knex';
import { createUsersRepository, UsersRepository } from '../../database/repositories/users-repository';

async function validateEmail(user: ResetPasswordRequest, usersRepository: UsersRepository): Promise<string | undefined> {
  if (isNullOrEmptyString(user.email)) return 'Is required';
  if (!validator.isEmail(user.email as string)) return 'Invalid email';
  if ((await usersRepository.countUsersByEmail(user.email as string)) === 0) return 'Not available';
}

async function validatePassword(user: Partial<UpdatePasswordRequest>): Promise<string | undefined> {
  if (isNullOrEmptyString(user.password)) return 'Is required';
  const options = { minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 };
  if (!validator.isStrongPassword(user.password as string, options)) return 'Required min length 8 and at least 1 lower case, upper case, number and special char';
}

export async function validateResetPasswordEmail(user: ResetPasswordRequest, context: PerRequestContext): Promise<ValidationResult<ResetPasswordRequest>> {
  const transaction = context.transaction as Knex.Transaction;
  const usersRepository = createUsersRepository(transaction);
  return <ValidationResult<ResetPasswordRequest>>{
    email: await validateEmail(user, usersRepository)
  }
}

export async function validateUpdatePassword(user: UpdatePasswordRequest): Promise<ValidationResult<UpdatePasswordRequest>> {
  return <ValidationResult<UpdatePasswordRequest>>{
    password: await validatePassword(user)
  }
}

