import { User } from '@supabase/gotrue-js';
import { Knex } from 'knex';
import { NextApiRequest, NextApiResponse } from 'next';

export type PerRequestContext = {
  user?: User;
  transaction?: Knex.Transaction;
  error?: any;
}

export type RouteHandler = (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => Promise<any>;

export type Methods = 'post' | 'get';
