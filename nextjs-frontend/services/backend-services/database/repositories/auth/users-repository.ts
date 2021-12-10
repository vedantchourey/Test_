import { knex } from '../../knex';

export function countUsersByEmail(email: string): number {
  const countAsString = knex('users').where({email: email}).count('id');
  return parseInt(countAsString, 10);
}

export function countUsersByUserName(username: string): number {
  const countAsString = knex('users').whereRaw("(raw_user_meta_data ->> 'username') = ?", [username])
                                     .count('id');
  return parseInt(countAsString, 10);
}
