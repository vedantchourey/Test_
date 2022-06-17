import { ICreateNewsRequest, ICreateNewsResponse, INewsResponse } from './i-edit-news';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { NewsRepository } from '../../database/repositories/news-repository';
import { validatePost } from './edit-news-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';

export async function editNews(req: ICreateNewsRequest, context: PerRequestContext): Promise<ServiceResponse<Partial<ICreateNewsRequest>, ICreateNewsResponse>> {
    const errors = await validatePost(req);
    if (isThereAnyError(errors)) return {errors: errors}
    const repository = new NewsRepository(context.transaction as Knex.Transaction);

    return {
        data: await repository.update(req)
    };
}
