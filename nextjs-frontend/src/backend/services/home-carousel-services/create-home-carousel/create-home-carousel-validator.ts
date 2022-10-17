import { ICreateHomeCarouselRequest } from './i-create-home-carousel';
import { isNullOrEmptyString, ValidationResult } from '../../../../common/utils/validation/validator';

function validateHomeCarouselContent(body: ICreateHomeCarouselRequest): string | undefined {
  if (isNullOrEmptyString(body.name)) return 'name is missing';
  if (isNullOrEmptyString(body.subtitle)) return 'subtitle is missing';
  if (isNullOrEmptyString(body.navigation)) return 'navigation is missing';
  if (isNullOrEmptyString(body.image)) return 'image is missing';
}
export async function validateHomeCarousel(post: ICreateHomeCarouselRequest): Promise<ValidationResult<ICreateHomeCarouselRequest>> {
  return {
    data: validateHomeCarouselContent(post)
  }
}