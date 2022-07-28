import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { ICommentLike } from '../models/i-comment-like';

export class NewsLikesRepository extends BaseRepository<ICommentLike> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, 'comment_likes');
  }

  async createLike(like: ICommentLike): Promise<string> {
        
    const ids = await this.entities()
                          .insert(like)
                          .returning('id');
    return ids[0] as string;
  }

  getById(id: string): Promise<ICommentLike | undefined> {
    return this.entities()
               .select('*')
               .where({ id: id })
               .first();
  }

  deleteLike(like: ICommentLike): Promise<number> {
    return this.entities()
      .where({
        commentId: like.commentId,
        likedBy: like.likedBy
      })
      .del();
  }

  likeCount(like: ICommentLike): Promise<any> {    
    
    return this.entities()
      .where({
        commentId: like.commentId
      })
      .count();
  }

}
