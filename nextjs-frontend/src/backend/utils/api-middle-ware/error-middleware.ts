import { NextApiRequest, NextApiResponse } from 'next';
import { PerRequestContext } from './api-middleware-typings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handleErrorMiddleware(req: NextApiRequest, res: NextApiResponse, context: PerRequestContext): Promise<any> {
  if (context.error) {
    console.error(context.error);
    res.status(500).json({message: 'something went wrong'});
  }
}
