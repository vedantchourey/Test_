import { Knex } from "knex";
import { PostsRepository } from "../database/repositories/posts-repository";
import { PostCommentsRepository } from '../database/repositories/post-comments-repository';
import { PostLikesRepository } from '../database/repositories/post-likes-repository';

export const getPostById = async (
    context: any,
    req: any,
  ): Promise<any | undefined> => {
    const transaction = context.transaction as Knex.Transaction;
    const postRepo = new PostsRepository(transaction);
    const postCommentRepository = new PostCommentsRepository(context.transaction as Knex.Transaction);
    const postLikeRepository = new PostLikesRepository(context.transaction as Knex.Transaction);
    const commentCount = await postCommentRepository.countCommentByPostId(req.id);
    const likeCount = await postLikeRepository.countLikesByPostId(req.id);
    const isLiked = await postLikeRepository.isLiked(req.id, context.user?.id as string)
    const result = await postRepo.getPostById(req.id);
    return {
        ...result,
        totalComments: commentCount,
        totalLikes: likeCount,
        isLiked: isLiked
    };
};