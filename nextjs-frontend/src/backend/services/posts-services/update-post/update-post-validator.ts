import { IUpdatePostRequest } from './i-update-post';
import { isNullOrEmptyString } from '../../../../common/utils/validation/validator';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';


async function validateIsPostOwner(post: IUpdatePostRequest) {
    if (isNullOrEmptyString(post.postContent)) return 'Post content is missing';
}

export async function validateRequest(post: IUpdatePostRequest, context: PerRequestContext) {
    return {
        postOwner: await validateIsPostOwner({ ...post, postedBy: context.user?.id || '' })
    }
}
