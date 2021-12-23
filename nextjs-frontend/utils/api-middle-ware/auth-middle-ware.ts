import { NextApiRequest, NextApiResponse } from 'next';
import { backendSupabase } from '../../services/backend-services/common/supabase-backend-client';
import { NoobUserRole } from './noob-user-role';
import { PerRequestContext, RouteHandler } from './api-middleware-typings';

type Opts = {
  allowedRoles: NoobUserRole[];
  allowAnonymous: boolean;
}

const defaultOPts: Opts = {allowedRoles: ['authenticated'], allowAnonymous: false};

function throwError(res: NextApiResponse, message: string) {
  res.status(401).json({message: 'Unauthorised'});
  throw new Error(message)
}

export const authMiddleWare = (opts: Opts = defaultOPts): RouteHandler => {
  const {allowAnonymous, allowedRoles} = opts;
  return async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext): Promise<any> => {
    const {authorization} = req.headers;
    if (allowAnonymous) return;
    if (authorization == null) return throwError(res, 'No auth header found!');
    if (!authorization.startsWith('Bearer ')) return throwError(res, 'No bearer token!');
    const bearerToken = authorization.replace('Bearer ', '');
    const {user} = await backendSupabase.auth.api.getUser(bearerToken);
    if (user == null) return throwError(res, 'Invalid token');
    if (allowedRoles.indexOf(user.role as NoobUserRole) === -1) return throwError(res, 'Invalid role');
    context.user = user;
  }
}


export const authenticatedUserMiddleware = authMiddleWare();
