import { isNullOrEmptyString, ValidationResult } from "../../../common/utils/validation/validator"; 
import { ISearchRequest} from "./i-search";

function validateSearch(search: ISearchRequest): string | undefined {
  if (isNullOrEmptyString(search.search)) return 'Field cannot be empty';
}

export async function validateRequest(search: ISearchRequest): Promise<ValidationResult<ISearchRequest>> {
  return {
    search: validateSearch(search)
  };
}