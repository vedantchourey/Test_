import { Knex } from 'knex';

export class BaseRepository<T> {
  constructor(protected transaction: Knex.Transaction,
              protected tableName: string) {
  }

  protected entities(): Knex.QueryBuilder<T> {
    return this.transaction(this.tableName);
  }
}