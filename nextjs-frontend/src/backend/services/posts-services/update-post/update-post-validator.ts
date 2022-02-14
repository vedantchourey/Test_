import { IUpdatePostRequest } from './i-update-post';
import { isNullOrEmptyString, isUrl, ValidationResult } from '../../../../common/utils/validation/validator';

<<<<<<< HEAD
function validatePostContent(post: IUpdatePostRequest) {
  if (isNullOrEmptyString(post.postContent)) return 'Post content is missing';
}

function validatePostImgUrl(post: IUpdatePostRequest) {
=======
function validatePostContent(post: IUpdatePostRequest): string | undefined {
  if (isNullOrEmptyString(post.postContent)) return 'Post content is missing';
}

function validatePostImgUrl(post: IUpdatePostRequest): string | undefined {
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
  if (isNullOrEmptyString(post.postImgUrl)) return 'Post image url is missing';
  if (!isUrl(post.postImgUrl)) return 'Post image url is invalid';
}

<<<<<<< HEAD
async function validateIsPostOwner(post: IUpdatePostRequest, context: PerRequestContext, postsRepository: PostsRepository) {
  if (isNullOrEmptyString(post.postId)) return 'Post id is missing';
  if (!isUUID(post.postId)) return 'Invalid post id';
  const postData = await postsRepository.getPostById(post.postId);
  if (!postData || !isObject(postData)) return 'Post do not exists';
  if (postData.postedBy !== context.user?.id) return 'You are not allowed to update post';
}


export async function validateRequest(post: IUpdatePostRequest, context: PerRequestContext) {
  const postsRepository = new PostsRepository(context.transaction!);

  return {
    postOwner: await validateIsPostOwner(post, context, postsRepository),
    postImgUrl: isObjectHasProperty(post, 'postImgUrl') ? validatePostImgUrl(post) : undefined,
    postContent: isObjectHasProperty(post, 'postContent') ? validatePostContent(post) : undefined
=======
export async function validateRequest(post: IUpdatePostRequest): Promise<ValidationResult<IUpdatePostRequest>> {
  return {
    postImgUrl: post.postImgUrl == null ? validatePostImgUrl(post) : undefined,
    postContent: post.postContent == null ? validatePostContent(post) : undefined
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
  }
}
