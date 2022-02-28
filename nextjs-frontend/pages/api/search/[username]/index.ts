import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { PerRequestContext } from '../../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { searchUserByUsername } from '../../../../src/backend/services/profile-service/search-profile-by-username';
import { authenticatedUserMiddleware } from '../../../../src/backend/utils/api-middle-ware/auth-middle-ware';
import { createQueryParamsMiddleWare } from '../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/query-validator-middle-ware';
import { ProfilesRepository } from '../../../../src/backend/services/database/repositories/profiles-repository';
import { Knex } from 'knex';
import { stringType } from '../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/types/string-type';

const basicQueryParams = createQueryParamsMiddleWare({
  params: {
    username: {
      type: stringType
    }
  },
  async validate(params: { [p: string]: string | string[] }, context: PerRequestContext): Promise<string | undefined> {
    const repository = new ProfilesRepository(context.transaction as Knex.Transaction);
    const username = params['username'];
    const profile = await repository.getProfileByUsername(username as string);
    if (profile == null) return `Could not find profile with username: ${username}`;
  }
});


export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => {
      const result = await searchUserByUsername(context);
      res.status(result.errors ? 400 : 200).send(result);
    },
    preHooks: [authenticatedUserMiddleware, beginTransactionMiddleWare, basicQueryParams],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  },
})
