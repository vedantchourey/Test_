import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@supabase/gotrue-js';

export type PerRequestContext = {
  user?: User;
}

export type RouteHandler = (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => Promise<any>;

type Methods = 'post' | 'get';

type RouteDefinitions = {
  handler: RouteHandler,
  preHooks?: RouteHandler[]
};


export function createNextJsRouteHandler(definitions: Partial<Record<Methods, RouteDefinitions>>): (req: NextApiRequest, res: NextApiResponse) => (void) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const definition = definitions[req.method!.toLowerCase() as Methods];
    if (definition == null) return res.status(404).json({message: 'not found'});
    const {handler, preHooks} = definition;
    const allHandlers = (preHooks || []).concat(handler);
    const context: PerRequestContext = {};
    return allHandlers.reduce((acc, currentHandler) => {
      return acc.then(() => currentHandler(req, res, context))
    }, Promise.resolve())
  }
}
