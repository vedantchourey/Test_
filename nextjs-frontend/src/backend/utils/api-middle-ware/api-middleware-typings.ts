import { User } from '@supabase/gotrue-js';
import { Knex } from 'knex';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServiceResponse } from '../../services/common/contracts/service-response';

export type PerRequestContext = {
  user?: User;
  transaction?: Knex.Transaction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NoobApiRouteHandler = (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => Promise<any>;

export type NoobApiService<TRequest, TResponse> = (req: TRequest, context: PerRequestContext) => Promise<ServiceResponse<TRequest, TResponse>>;

export type Methods = 'post' | 'get';
