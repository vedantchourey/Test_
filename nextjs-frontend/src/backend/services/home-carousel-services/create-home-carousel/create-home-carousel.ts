import {
  ICreateHomeCarouselRequest,
  ICreateHomeCarouselResponse,
} from "./i-create-home-carousel";
import { PerRequestContext } from "../../../utils/api-middle-ware/api-middleware-typings";
import { HomeCarouselRepository } from "../../database/repositories/home-carousel-repository";
import { validateHomeCarousel } from "./create-home-carousel-validator";
import { isThereAnyError } from "../../../../common/utils/validation/validator";
import { Knex } from "knex";
import { ServiceResponse } from "../../common/contracts/service-response";

export async function createHomeCarousel(
  req: ICreateHomeCarouselRequest,
  context: PerRequestContext
): Promise<ServiceResponse<Partial<ICreateHomeCarouselRequest>, ICreateHomeCarouselResponse>> {

  const errors = await validateHomeCarousel(req);
  if (isThereAnyError(errors)) return { errors: errors };
  const repository = new HomeCarouselRepository(context.transaction as Knex.Transaction);

  const homeCarouselId = await repository.createHomeCarousel({
    name: req.name || "",
    subtitle: req.subtitle || "",
    navigation: req.navigation || "",
    image: req.image
  });

  const createdHomeCarousel = await repository.getHomeCarousel(homeCarouselId as string);
  const { id, createdAt, updatedAt, name, subtitle, navigation, image } = createdHomeCarousel as ICreateHomeCarouselResponse;

  return {
    data: {
      id,
      name,
      subtitle,
      navigation,
      image,
      createdAt: createdAt?.toISOString() as string,
      updatedAt: updatedAt?.toISOString() as string,
    } as unknown as ICreateHomeCarouselResponse
  }
}
