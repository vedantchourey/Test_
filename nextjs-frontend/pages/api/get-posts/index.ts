import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { getPost } from '../../../src/backend/services/posts-services';

export default createNextJsRouteHandler({
    get: {
        handler: async (req: NextApiRequest, res: NextApiResponse) => {
            const result = await getPost();
            res.send(result);
        }
    }
})