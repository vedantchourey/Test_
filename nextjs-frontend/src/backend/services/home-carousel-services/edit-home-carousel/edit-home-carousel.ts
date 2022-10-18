import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { HomeCarouselRepository } from '../../database/repositories/home-carousel-repository';
import { ServiceResponse } from '../../common/contracts/service-response';
import { Knex } from 'knex';

export const editHomeCarousel = async (req: any, context: PerRequestContext): Promise<ServiceResponse<unknown, { message: string }>> => {
  const repository = new HomeCarouselRepository(context.transaction as Knex.Transaction);
  await repository.update(req);
  return {
    data: { message: "Carousel updated" }
  }
}
