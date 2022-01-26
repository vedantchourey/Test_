import { NextApiRequest, NextApiResponse } from 'next';
import { Methods, NoobApiRouteHandler, PerRequestContext } from './api-middleware-typings';


type RouteDefinitions = {
  handler: NoobApiRouteHandler,
  preHooks?: NoobApiRouteHandler[],
  postHooks?: NoobApiRouteHandler[],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function executeAll(hooks: NoobApiRouteHandler[], req: NextApiRequest, res: NextApiResponse, context: PerRequestContext, seed: Promise<any> = Promise.resolve()) {
  return hooks.reduce((acc, currentHandler) => {
    return acc.then(() => currentHandler(req, res, context))
  }, seed);
}

export function createNextJsRouteHandler(definitions: Partial<Record<Methods, RouteDefinitions>>): (req: NextApiRequest, res: NextApiResponse) => (void) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const definition = definitions[req.method?.toLowerCase() as Methods];
    if (definition == null) return res.status(404).json({message: 'not found'});
    const {handler, preHooks = [], postHooks = []} = definition;
    const context: PerRequestContext = {};
    return executeAll(preHooks, req, res, context).then(() => handler(req, res, context))
                                                  .then(() => executeAll(postHooks, req, res, context))
                                                  .catch(async (e) => {
                                                    console.error(e);
                                                    await executeAll(postHooks, req, res, {...context, error: e});
                                                    throw e;
                                                  })
  }
}
