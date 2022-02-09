import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { ILike } from '../models/i-like';

export class PostLikesRepository extends BaseRepository<ILike> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, 'post_likes');
  }

  createLike(like: ILike): Promise<ILike> {
    return this.entities()
               .insert(like);
  }

  deleteLike(like: ILike): Promise<number> {
    return this.entities()
               .where({
                 postId: like.postId,
                 likedBy: like.likedBy
               })
               .del();
  }

  async isLiked(postId: string, userId: string | undefined): Promise<boolean> {
    const count = await this.entities()
                            .select('id')
                            .where({
                              postId: postId,
                              likedBy: userId
                            })
                            .count();
    return count > 0;
  }
}
