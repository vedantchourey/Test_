import { NextApiRequest, NextApiResponse } from 'next';
import { PerRequestContext } from './api-middleware-typings';
import { createKnexConnection } from '../../services/database/knex';
import { Knex } from 'knex';

export async function beginTransactionMiddleWare(req: NextApiRequest, res: NextApiResponse, context: PerRequestContext): Promise<void> {
  await context.createTransaction(createKnexConnection());
}

export async function commitOrRollBackTransactionMiddleWare(req: NextApiRequest, res: NextApiResponse, context: PerRequestContext): Promise<void> {
  const transaction = context.transaction as Knex.Transaction;
  if (context.error) {
    await transaction.rollback(context.error);
  } else {
    await transaction.commit();
  }
}
