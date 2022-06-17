import { ILikeNews } from './i-like-news';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { NewsLikesRepository } from '../../database/repositories/news-like-repository';
import { validatePost } from './like-news-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';

export async function likeNews(req: ILikeNews, context: PerRequestContext): Promise<ServiceResponse<unknown, { message: string }>> {
    const errors = await validatePost(req);
    if (isThereAnyError(errors)) return {errors: errors}
    const repository = new NewsLikesRepository(context.transaction as Knex.Transaction);

    const _res = await repository.createLike({newsId: req.newsId, likedBy: context.user?.id})
    console.log(_res);
    
    return {
        data: { message: "news liked" }
    }
}
