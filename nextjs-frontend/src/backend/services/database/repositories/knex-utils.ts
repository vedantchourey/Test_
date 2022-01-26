import { knex } from '../knex';
import { Knex } from 'knex';

export function createTransaction(): Promise<Knex.Transaction> {
  return knex.transaction();
}

export function knexQuery(table?: string): Knex {
  return knex();
}