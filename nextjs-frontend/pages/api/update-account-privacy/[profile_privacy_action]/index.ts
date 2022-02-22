import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { PerRequestContext } from '../../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { authenticatedUserMiddleware } from '../../../../src/backend/utils/api-middle-ware/auth-middle-ware';
import { createQueryParamsMiddleWare } from '../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/query-validator-middle-ware';
import { stringType } from '../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/types/string-type';
import { ProfilesRepository } from '../../../../src/backend/services/database/repositories/profiles-repository';
import { Knex } from 'knex';
import { updatePrivateStatus } from '../../../../src/backend/services/profile-service/update-Private-Profile-Status/update-private-profile-status'

const basicQueryParams = createQueryParamsMiddleWare({
  params: {
    profile_privacy_action: {
      type: stringType
    }
  },
  async validate(params: { [p: string]: string | string[] }, context: PerRequestContext): Promise<string | undefined> {
    const repository = new ProfilesRepository(context.transaction as Knex.Transaction);
    const userData = await repository.getProfileById(context.user?.id as string);
    if (userData == null) return `Could not find user with userId: ${context.user?.id}`;
    if (userData.isPrivate === true && params.profile_privacy_action === 'private') return 'Your profile is already private';
    if (userData.isPrivate === false && params.profile_privacy_action === 'public') return 'Your profile is already public';
  }
});

export default createNextJsRouteHandler({
  patch: {
    handler: async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => {
      const result = await updatePrivateStatus(context);
      res.status(result.errors ? 400 : 200).send(result);
    },
    preHooks: [authenticatedUserMiddleware, beginTransactionMiddleWare, basicQueryParams],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
})
