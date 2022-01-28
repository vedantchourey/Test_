import { User } from '@supabase/gotrue-js';
import { Knex } from 'knex';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServiceResponse } from '../../services/common/contracts/service-response';

export type PerRequestContext = {
  user?: User;
  transaction?: Knex.Transaction;
  error?: any;
}

export type NoobApiRouteHandler = (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => Promise<any>;

export type NoobApiService<TRequest, TResponse> = (req: TRequest, context: PerRequestContext) => Promise<ServiceResponse<TRequest, TResponse>>;

export type Methods = 'post' | 'get' | 'patch';
