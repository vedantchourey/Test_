import { User } from '@supabase/gotrue-js';
import { Knex } from 'knex';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServiceResponse } from '../../services/common/contracts/service-response';

type MiddlewareResponse = { status: number, data: { message: string } };

export class PerRequestContext {

  user?: User;
  private _transaction?: Knex.Transaction;
  private _knexConnection?: Knex;
  error: unknown;
  private _middlewareResponse: MiddlewareResponse | undefined;

  get transaction(): Knex.Transaction | undefined {
    return this._transaction;
  }

  async createTransaction(knexConnection: Knex) {
    this._knexConnection = knexConnection;
    this._transaction = await knexConnection.transaction();
  }

  get middlewareResponse(): MiddlewareResponse | undefined {
    return this._middlewareResponse;
  }

  set middlewareResponse(value: MiddlewareResponse | undefined) {
    if (this._middlewareResponse != null) throw new Error('middle ware resposne already set');
    this._middlewareResponse = value;
  }

  async destroy() {
    if (this._transaction != null && !this._transaction.isCompleted()) {
      await this._transaction.rollback();
    }
    this._transaction?.destroy();
    await this._knexConnection?.destroy();
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NoobApiRouteHandler = (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => Promise<any>;

export type NoobApiService<TRequest, TResponse> = (req: TRequest, context: PerRequestContext) => Promise<ServiceResponse<TRequest, TResponse>>;

export type Methods = 'post' | 'get';
