import { Knex } from "knex";
import { PerRequestContext } from "../../../utils/api-middle-ware/api-middleware-typings";
import { createProfileRepository } from "../../database/repositories/profiles-repository";
import { createUsersRepository } from "../../database/repositories/users-repository";
import { FollowersRepository } from "../../database/repositories/followers-repository";
import { CrudRepository } from "../../database/repositories/crud-repository";
import { IChannel } from "../../database/models/i-channel";
import { IChatUsers } from "../../database/models/i-chat-users";
import { PostsRepository } from "../../database/repositories/posts-repository";
import { PostLikesRepository } from "../../database/repositories/post-likes-repository";
import { PostCommentsRepository } from "../../database/repositories/post-comments-repository";
import { NewsLikesRepository } from '../../database/repositories/comment-like-repository';

export const deleteUser = async (
  request: { id: string },
  context: PerRequestContext
): Promise<any> => {
  const channelRepo = new CrudRepository<IChannel>(
    context.transaction as Knex.Transaction,
    "channel"
  );
  const chatUserRepo = new CrudRepository<IChatUsers>(
    context.transaction as Knex.Transaction,
    "chat_users"
  );
  const usersRepository = createUsersRepository(
    context.transaction as Knex.Transaction
  );
  const profileRepository = createProfileRepository(
    context.transaction as Knex.Transaction
  );
  const followersRepository = new FollowersRepository(
    context.transaction as Knex.Transaction
  );
  const postRepository = new PostsRepository(
    context.transaction as Knex.Transaction
  );
  const postLikeRepository = new PostLikesRepository(
    context.transaction as Knex.Transaction
  );
  const postCommentsRepository = new PostCommentsRepository(
    context.transaction as Knex.Transaction
  );
  const commentsLikeRepository = new NewsLikesRepository(
    context.transaction as Knex.Transaction
  );

  await channelRepo.delete({ owner: request.id });
  await profileRepository.deleteById(request.id);
  await followersRepository.delete(request.id);
  await chatUserRepo.delete({ user_id: request.id });
  await chatUserRepo.delete({ other_user: request.id });
  await postRepository.delete(request.id);
  await postLikeRepository.delete(request.id);
  await postCommentsRepository.delete(request.id);
  await commentsLikeRepository.delete(request.id);

  const res = usersRepository.delete(request.id);
  return res;
};
