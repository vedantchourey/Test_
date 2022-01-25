import { NextApiRequest, NextApiResponse } from 'next';
import { createTransaction } from '../../services/database/repositories/knex-utils';
import { PerRequestContext } from './api-middleware-typings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function beginTransactionMiddleWare(req: NextApiRequest, res: NextApiResponse, context: PerRequestContext): Promise<any> {
  context.transaction = await createTransaction();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function commitOrRollBackTransactionMiddleWare(req: NextApiRequest, res: NextApiResponse, context: PerRequestContext): Promise<any> {
  if (context.error) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    context.transaction!.rollback(context.error);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    context.transaction!.commit();
  }
}
