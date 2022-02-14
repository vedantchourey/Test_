import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { PerRequestContext } from '../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { createPost } from '../../../src/backend/services/posts-services';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { authenticatedUserMiddleware } from '../../../src/backend/utils/api-middle-ware/auth-middle-ware';

export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => {
<<<<<<< HEAD:nextjs-frontend/pages/api/add-follower/[follow_action].ts
      const result = await addFollower(Object.assign({...req.body}, req.query), context);
      res.status(result?.errors ? 400 : 200).send(result)
=======
      const result = await createPost(req.body, context);
      res.status(result.errors ? 400 : 200).send(result)
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d:nextjs-frontend/pages/api/posts/index.ts
    },
    preHooks: [authenticatedUserMiddleware, beginTransactionMiddleWare],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
<<<<<<< HEAD:nextjs-frontend/pages/api/add-follower/[follow_action].ts
})
=======
});
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d:nextjs-frontend/pages/api/posts/index.ts
