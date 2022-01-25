import { NextApiRequest, NextApiResponse } from 'next';
import { backendSupabase } from '../../services/common/supabase-backend-client';
import { NoobUserRole } from './noob-user-role';
import { NoobApiRouteHandler, PerRequestContext } from './api-middleware-typings';
import { UserRoleRepository } from '../../services/database/repositories/user-roles-repository';
import { User } from '@supabase/gotrue-js';
import { Knex } from 'knex';

type Opts = {
  allowedRoles: NoobUserRole[];
  allowAnonymous: boolean;
}

function throwError(res: NextApiResponse, message: string, context: PerRequestContext) {
  res.status(401).json({message: 'Unauthorised'});
  const error = new Error(message);
  context.error = error;
  throw error
}

async function isUserAuthorized(user: User, allowedRoles: NoobUserRole[], context: PerRequestContext) {
  if (allowedRoles.length === 0) return true;
  const userRoleRepository = new UserRoleRepository(context.transaction as Knex.Transaction);
  const roles = await userRoleRepository.getRolesByUserId(user.id);
  if (roles.length === 0) return false;
  return roles.some((x) => allowedRoles.indexOf(x.code) !== -1);
}

const authMiddleWare = (opts: Opts): NoobApiRouteHandler => {
  const {allowAnonymous, allowedRoles} = opts;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext): Promise<any> => {
    const {authorization} = req.headers;
    if (allowAnonymous) return;
    if (authorization == null) return throwError(res, 'No auth header found!', context);
    if (!authorization.startsWith('Bearer ')) return throwError(res, 'No bearer token!', context);
    const bearerToken = authorization.replace('Bearer ', '');
    const {user} = await backendSupabase.auth.api.getUser(bearerToken);
    if (user == null) return throwError(res, 'Invalid token', context);
    if (user.role !== 'authenticated') return throwError(res, 'Invalid role', context);
    if (!(await isUserAuthorized(user, allowedRoles, context))) return throwError(res, 'unauthorized!', context);
    context.user = user;
  }
}

export const authenticatedUserMiddleware = authMiddleWare({allowedRoles: [], allowAnonymous: false});
export const authenticatedAdminUserMiddleware = authMiddleWare({allowedRoles: ['noob-admin'], allowAnonymous: false});
