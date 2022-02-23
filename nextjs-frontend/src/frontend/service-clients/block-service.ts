import frontendConfig from "../utils/config/front-end-config";
import { getAuthHeader } from "../utils/headers";
import { post, deleteRequest } from "./fetch-api-wrapper";
import { NoobPostResponse } from "./messages/common-messages";

interface IBlockRequest {
    userId: string;
}
interface IUnblockRequest {
    userId: string;
}

const blockUser = async (userId: string): Promise<NoobPostResponse<IBlockRequest, IUnblockRequest>> => {
  const endpoint = frontendConfig.noobStormServices.blockActions.block(userId);
  const headers = await getAuthHeader();
  const result = await post(endpoint, null, headers);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null) return { errors: body.errors, isError: true }
  throw body;
}

const unBlockUser = async (userId: string): Promise<NoobPostResponse<IBlockRequest, IUnblockRequest>> => {
  const endpoint = frontendConfig.noobStormServices.blockActions.unBlock(userId);
  const headers = await getAuthHeader();
  const result = await deleteRequest(endpoint, null, headers);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null) return { errors: body.errors, isError: true }
  throw body;
}

export { blockUser, unBlockUser };