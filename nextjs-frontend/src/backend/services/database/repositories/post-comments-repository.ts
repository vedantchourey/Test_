import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { IPostComment } from '../models/i-post-comment';
import { nowAsJsDate } from '../../../../common/utils/date-time-utils';

interface IUpdateComment {
  comment: string;
}

export class PostCommentsRepository extends BaseRepository<IPostComment> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, 'post_comments');
  }

  async createComment(comment: IPostComment): Promise<string> {
    const ids = await this.entities().insert(comment)
                          .returning('id');
    return ids[0] as string;
  }

  getCommentById(id: string): Promise<IPostComment | undefined> {
    return this.entities()
               .select('*')
               .where({id: id})
               .first();
  }

  async getByPostIdCommentId(postId: string, commentId: string): Promise<IPostComment | undefined> {
    return this.entities().select('*')
               .where({
                 postId: postId,
                 id: commentId
               })
               .first();
  }

  async countCommentByPostId(postId: string): Promise<number>{
    const result = await this.entities().where({postId: postId})
                             .count('id');
    return parseInt(result[0].count, 10);
  }

  async countCommentById(id: string): Promise<number> {
    const result = await this.entities().whereRaw("id = ?", [id])
                             .count('id');
    return parseInt(result[0].count, 10);
  }

  async deleteComment(id: string, userId: string | undefined): Promise<number> {
    return this.entities()
               .where({
                 id: id,
                 commentBy: userId
               })
               .del();
  }

  async updateComment(id: string, postId: string, update: IUpdateComment): Promise<number> {
    return this.entities()
               .where({
                 id: id,
                 postId: postId
               })
               .update({
                 comment: update.comment,
                 updatedAt: nowAsJsDate()
               });
  }
}
