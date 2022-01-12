import { NextApiRequest, NextApiResponse } from 'next';
import { backendSupabase } from '../../services/common/supabase-backend-client';
import { NoobUserRole } from './noob-user-role';
import { PerRequestContext, RouteHandler } from './api-middleware-typings';
import { createUserRoleRepository } from '../../services/database/repositories/user-roles-repository';
import { User } from '@supabase/gotrue-js';

type Opts = {
  allowedRoles: NoobUserRole[];
  allowAnonymous: boolean;
}

const defaultOPts: Opts = {allowedRoles: [], allowAnonymous: false};

function throwError(res: NextApiResponse, message: string) {
  res.status(401).json({message: 'Unauthorised'});
  throw new Error(message)
}

async function isUserAuthorized(user: User, allowedRoles: NoobUserRole[]) {
  if (allowedRoles.length === 0) return true;
  const userRoleRepository = createUserRoleRepository();
  const roles = await userRoleRepository.getRolesByUserId(user.id);
  if (roles.length === 0) return false;
  return roles.some(x => allowedRoles.indexOf(x.code) !== -1);
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
    if (user.role !== 'authenticated') return throwError(res, 'Invalid role');
    if (!(await isUserAuthorized(user, allowedRoles))) return throwError(res, 'unauthorized!');
    context.user = user;
  }
}

export const authenticatedUserMiddleware = authMiddleWare();
