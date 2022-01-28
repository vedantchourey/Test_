import { User } from '@supabase/gotrue-js';
import { Knex } from 'knex';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServiceResponse } from '../../services/common/contracts/service-response';

export class PerRequestContext {
  user?: User;
  private _transaction?: Knex.Transaction;
  private _knexConnection?: Knex;
  error: unknown;

  get transaction(): Knex.Transaction | undefined {
    return this._transaction;
  }

  async createTransaction(knexConnection: Knex) {
    this._knexConnection = knexConnection;
    this._transaction = await knexConnection.transaction();
  }

  async destroy() {
    this._transaction?.destroy();
    await this._knexConnection?.destroy();
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NoobApiRouteHandler = (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => Promise<any>;

export type NoobApiService<TRequest, TResponse> = (req: TRequest, context: PerRequestContext) => Promise<ServiceResponse<TRequest, TResponse>>;

export type Methods = 'post' | 'get';
