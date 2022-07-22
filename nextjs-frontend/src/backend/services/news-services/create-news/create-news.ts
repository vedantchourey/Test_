import { ICreateNewsRequest, ICreateNewsResponse, INewsResponse } from './i-create-news';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { NewsRepository } from '../../database/repositories/news-repository';
import { validatePost } from './create-news-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';

export async function createNews(req: ICreateNewsRequest, context: PerRequestContext): Promise<ServiceResponse<Partial<ICreateNewsRequest>, ICreateNewsResponse>> {
  const errors = await validatePost(req);
  if (isThereAnyError(errors)) return {errors: errors}
  const repository = new NewsRepository(context.transaction as Knex.Transaction);

    const newsId = await repository.createNews({
        title: req.title,
        subtitle: req.subtitle,
        author: req.author,
        image: req.image,
        description: req.description,
        category:req.category,
    });

    const createdPost = await repository.getNewsUsingId(newsId as string);
    const {id, createdAt, updatedAt, title, subtitle, author, image, description} = createdPost as INewsResponse;
    return {
      data: {
        id,
        title,
        author,
        subtitle,
        image,
        description,
        updatedAt: updatedAt?.toISOString() as string,
        createdAt: createdAt?.toISOString() as string
      } as unknown as ICreateNewsResponse
    }
}
