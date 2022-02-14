import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { ILike } from '../models/i-like';

export class PostLikesRepository extends BaseRepository<ILike> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, 'post_likes');
  }

  async createLike(like: ILike): Promise<string> {
    const ids = await this.entities()
      .insert(like)
      .returning('id');
    return ids[0] as string;
  }

  getById(id: string): Promise<ILike | undefined> {
    return this.entities()
      .select('*')
      .where({ id: id })
      .first();
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
    const like = await this.entities()
      .select('*')
      .where({
        postId: postId,
        likedBy: userId
      })
      .first();
    return like != null;
  }
}
