import { ICreateCommentRequest } from "./i-create-comment";
import { PerRequestContext } from "../../../utils/api-middle-ware/api-middleware-typings";
import { validateRequest } from "./create-comment-validator";
import { isThereAnyError } from "../../../../common/utils/validation/validator";
import { PostCommentsRepository } from "../../database/repositories/post-comments-repository";
import { Knex } from "knex";
import { ServiceResponse } from "../../common/contracts/service-response";
import { IPostCommentResponse } from "../../database/models/i-post-comment";
import { ICreatePostCommentResponse } from "../i-post-comment-response";
import { CrudRepository } from "../../database/repositories/crud-repository";
import { IProfile } from "../../database/models/i-profile";
import { INotifications } from "../../database/models/i-notifications";
import { addNotifications } from "../../notifications-service";

export async function createComment(
  req: ICreateCommentRequest,
  context: PerRequestContext
): Promise<ServiceResponse<ICreateCommentRequest, ICreatePostCommentResponse>> {
  const errors = await validateRequest(req);
  if (isThereAnyError(errors)) return { errors };
  const repository = new PostCommentsRepository(
    context.transaction as Knex.Transaction
  );

  const userRepo = new CrudRepository<IProfile>(
    context.knexConnection as Knex,
    "profiles"
  );

  const findMentions = req.comment.split(" ").filter((s) => s[0] === "@");

  const userIdBatchResponse = await Promise.all(
    findMentions.map((u: string) =>
      userRepo.find({ username: u.replace("@", "") }))
  );

  const userIds = userIdBatchResponse
    .filter((i) => i.length > 0)
    .map((u) => u[0].id)
    // .filter((i) => i !== context.user?.id);

  const postUUID = context.getParamValue("postId") as string;
  const commentId = await repository.createComment({
    comment: req.comment,
    commentBy: context.user?.id as string,
    postId: postUUID,
    subComment: req.subComment,
  });
  const createdComment = await repository.getCommentByPostIdCommentId(
    commentId
  );
  const {
    createdAt,
    updatedAt,
    commentBy,
    comment,
    id,
    postId,
    username,
    firstName,
    lastName,
    avatarUrl,
    subComment,
  } = createdComment as IPostCommentResponse;

  const notification: INotifications[] = userIds.map((uId) => {
    return({
    type: "MENTION_NOTIFICATION",
    user_id: uId,
    is_action_required: false,
    sent_by: context.user?.id,
    message: `${username} mention you in comment`,
  })});

  if(notification.length) await addNotifications(notification, context.transaction as Knex);

  return {
    data: {
      id,
      postId,
      comment,
      commentOwner: {
        id: commentBy,
        username: username,
        firstName: firstName,
        lastName: lastName,
        avatar: avatarUrl,
      },
      subComment,
      createdAt: createdAt?.toISOString() as string,
      updatedAt: updatedAt?.toISOString() as string,
    } as unknown as ICreatePostCommentResponse,
  };
}
