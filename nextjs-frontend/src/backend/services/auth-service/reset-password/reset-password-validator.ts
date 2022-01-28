import validator from 'validator';
import { isNullOrEmptyString, ValidationResult } from '../../../../common/utils/validation/validator';
import { ResetPasswordRequest, UpdatePasswordRequest } from './i-reset-password';
import { knexQuery } from "../../database/repositories/knex-utils";


async function validateEmail(user:ResetPasswordRequest) {
    if (isNullOrEmptyString(user.email)) return 'Is required';
    if (!validator.isEmail(user.email as string)) return 'Invalid email';
    const userData = await knexQuery().table('auth.users').where({"email":user.email}).select('*').first();
    if(!('id' in userData )) return 'No account found';
  }

async function validatePassword(user: Partial<UpdatePasswordRequest>) {
    if (isNullOrEmptyString(user.password)) return 'Is required';
    const options = {minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1};
    if (!validator.isStrongPassword(user.password as string, options)) return 'Required min length 8 and at least 1 lower case, upper case, number and special char';
  }

  export async function validateResetPasswordEmail(user: ResetPasswordRequest) {
    return <ValidationResult<ResetPasswordRequest>>{
      email: await validateEmail(user)
    }
  }

  export async function validateUpdatePassword(user: UpdatePasswordRequest){
    return <ValidationResult<UpdatePasswordRequest>>{
      password: await validatePassword(user)
    }
  }

