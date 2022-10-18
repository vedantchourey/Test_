import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { PerRequestContext } from '../../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { editHomeCarousel } from "../../../../src/backend/services/home-carousel-services/edit-home-carousel/edit-home-carousel";
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { createQueryParamsMiddleWare } from '../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/query-validator-middle-ware';
import { stringType } from '../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/types/string-type';
import { Knex } from 'knex';
import { HomeCarouselRepository } from '../../../../src/backend/services/database/repositories/home-carousel-repository';
import { authenticatedUserMiddleware } from '../../../../src/backend/utils/api-middle-ware/auth-middle-ware';

const basicQueryParams = createQueryParamsMiddleWare({
    params: {
        id: {
            type: stringType
        }
    },
    async validate(params: { [p: string]: string | string[] }, context: PerRequestContext): Promise<string | undefined> {
        const repository = new HomeCarouselRepository(context.transaction as Knex.Transaction);
        const id = params['carousel'];
        const carousel = await repository.getHomeCarousel(id.toString());
        if (carousel == null) return `Could not find carousel with id: ${id}`;
    }
});

export default createNextJsRouteHandler({
  patch: {
    handler: async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => {
      const result = await editHomeCarousel(req, context);
      res.status(result.errors ? 400 : 200).send(result)
    },
    preHooks: [authenticatedUserMiddleware, beginTransactionMiddleWare, basicQueryParams],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
});