import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { PerRequestContext } from '../../../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { followUnfollow } from '../../../../../src/backend/services/follower-service';
import { authenticatedUserMiddleware } from '../../../../../src/backend/utils/api-middle-ware/auth-middle-ware';
import { createQueryParamsMiddleWare } from '../../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/query-validator-middle-ware';
import { uuidType } from '../../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/types/uuid-type';
import { stringType } from '../../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/types/string-type';
import { FollowersRepository } from '../../../../../src/backend/services/database/repositories/followers-repository';
import { ProfilesRepository } from '../../../../../src/backend/services/database/repositories/profiles-repository';
import { Knex } from 'knex';

const paramsConfig = {
  userId: {
    type: uuidType
  },
  follow_action: {
    type: stringType
  }
};

const basicQueryParams = createQueryParamsMiddleWare({
  params: paramsConfig,
  async validate(params: { [p: string]: string | string[] }, context: PerRequestContext): Promise<string | undefined> {
    const repository = new FollowersRepository(context.transaction as Knex.Transaction);
    const profileRepository = new ProfilesRepository(context.transaction as Knex.Transaction);
    const userId = params['userId'] as string;
    const user = await profileRepository.countUserById(userId);
    const result = await repository.countFollowerById(context.user?.id as string, userId);
    if(result) return `User is already followed`;
    if (!user) return `Could not find user with userId: ${userId}`;
  }
});

const deleteQueryParams = createQueryParamsMiddleWare({
  params: paramsConfig,
  async validate(params: { [p: string]: string | string[] }, context: PerRequestContext): Promise<string | undefined> {
    const repository = new FollowersRepository(context.transaction as Knex.Transaction);
    const profileRepository = new ProfilesRepository(context.transaction as Knex.Transaction);
    const userId = params['userId'] as string;
    const user = await profileRepository.countUserById(userId);
    const result = await repository.countFollowerById(context.user?.id as string, userId);
    if(!result) return `User is already unfollowed`;
    if (!user) return `Could not find user with userId: ${userId}`;
  }
});

export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => {
      const result = await followUnfollow(context);
      res.status(result?.errors ? 400 : 200).send(result)
    },
    preHooks: [authenticatedUserMiddleware, beginTransactionMiddleWare, basicQueryParams],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  },
  delete: {
    handler: async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => {
      const result = await followUnfollow(context);
      res.status(result?.errors ? 400 : 200).send(result)
    },
    preHooks: [authenticatedUserMiddleware, beginTransactionMiddleWare, deleteQueryParams],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
})