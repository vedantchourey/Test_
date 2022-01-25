import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../src/backend/utils/api-middle-ware/api-handler-factory';
import { PerRequestContext } from '../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { ServiceResponse } from '../../src/backend/services/common/contracts/service-response';
import { createPost } from '../../src/backend/services/posts-services';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../src/backend/utils/api-middle-ware/transaction-middle-ware';

export default createNextJsRouteHandler({
    post: {
        handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<object, object>>, context: PerRequestContext) => {
            const result = await createPost(req.body, context);
            res.status(result.errors ? 400 : 200).send(result)
        },
        preHooks: [beginTransactionMiddleWare],
        postHooks: [commitOrRollBackTransactionMiddleWare]
    }
});