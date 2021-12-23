import { NextApiRequest, NextApiResponse } from 'next';
import { createTransaction } from '../../services/backend-services/database/repositories/knex-utils';
import { PerRequestContext } from './api-middleware-typings';

export async function beginTransactionMiddleWare(req: NextApiRequest, res: NextApiResponse, context: PerRequestContext): Promise<any> {
  context.transaction = await createTransaction();
}

export async function commitOrRollBackTransactionMiddleWare(req: NextApiRequest, res: NextApiResponse, context: PerRequestContext): Promise<any> {
  if (context.error) {
    context.transaction!.rollback(context.error);
  } else {
    context.transaction!.commit();
  }
}
