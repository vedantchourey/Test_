import { PerRequestContext } from "../../../utils/api-middle-ware/api-middleware-typings";
import { HomeCarouselRepository } from "../../database/repositories/home-carousel-repository";
import { Knex } from "knex";
import { ServiceResponse } from "../../common/contracts/service-response";

export const getHomeCarousel = async (req: any, context: PerRequestContext): Promise<ServiceResponse<unknown, any>> => {
  const repository = new HomeCarouselRepository(
    context.transaction as Knex.Transaction
  );
  const response = await repository.getHomeCarousel(req.carousel);
  return response
};
