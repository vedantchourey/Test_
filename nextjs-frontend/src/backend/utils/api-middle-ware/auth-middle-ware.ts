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

function setResponse(message: string, context: PerRequestContext): void {
  context.middlewareResponse = {status: 401, data: {message: 'Unauthorised'}}
}

async function isUserAuthorized(user: User, allowedRoles: NoobUserRole[], context: PerRequestContext): Promise<boolean> {
  if (allowedRoles.length === 0) return true;
  const userRoleRepository = new UserRoleRepository(context.transaction as Knex.Transaction);
  const roles = await userRoleRepository.getRolesByUserId(user.id);
  if (roles.length === 0) return false;
  return roles.some((x) => allowedRoles.indexOf(x.code) !== -1);
}

const authMiddleWare = (opts: Opts): NoobApiRouteHandler => {
  const {allowAnonymous, allowedRoles} = opts;
  return async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext): Promise<unknown> => {
    const {authorization} = req.headers;
    if (allowAnonymous) return;
    if (authorization == null) return setResponse('No auth header found!', context);
    if (!authorization.startsWith('Bearer ')) return setResponse('No bearer token!', context);
    const bearerToken = authorization.replace('Bearer ', '');
    const {user} = await backendSupabase.auth.api.getUser(bearerToken);
    if (user == null) return setResponse('Invalid token', context);
    if (user.role !== 'authenticated') return setResponse('Invalid role', context);
    if (!(await isUserAuthorized(user, allowedRoles, context))) return setResponse('unauthorized!', context);
    context.user = user;
  }
}

export const authenticatedUserMiddleware = authMiddleWare({allowedRoles: [], allowAnonymous: false});
export const authenticatedAdminUserMiddleware = authMiddleWare({allowedRoles: ['noob-admin'], allowAnonymous: false});
