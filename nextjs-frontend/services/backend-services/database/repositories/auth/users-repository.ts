import { knex } from '../../knex';

export async function countUsersByEmail(email: string): Promise<number> {
  const result = await knex('auth.users').where({email: email}).count('id');
  return parseInt(result[0].count, 10);
}

export async function countUsersByUserName(username: string): Promise<number> {
  const result = await knex('auth.users').whereRaw("(raw_user_meta_data ->> 'username') = ?", [username])
                                    .count('id');
  return parseInt(result[0].count, 10);
}
