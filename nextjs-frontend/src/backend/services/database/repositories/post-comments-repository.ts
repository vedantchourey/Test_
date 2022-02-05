import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { IPostComments } from '../models/i-post-comments';

interface IUpdateComment {
  comment?: string;
  postId?: string;
  updatedAt: string;
}

export class PostCommentsRepository extends BaseRepository<IPostComments> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, 'post_comments');
  }

  async createComment(comment: IPostComments) {
    return this.entities().insert(comment);
  }

  async getCommentById(id: string) {
    return this.entities().select('*')
               .first()
               .where('id', id);
  }

  async getByPostIdCommentId(postId: string, commentId: string) {
    return this.entities().select('*')
               .first()
               .where('postId', postId)
               .where('id', commentId);
  }


  async countCommentById(id: string): Promise<number> {
    const result = await this.entities().whereRaw("id = ?", [id])
                             .count('id');
    return parseInt(result[0].count, 10);
  }

  async deleteComment(id: string, userId: string | undefined) {
    return this.entities().where({id: id, commentBy: userId})
               .del();
  }

  async updateComment(id: string, update: IUpdateComment): Promise<object> {
    return this.entities().where('id', id)
               .update(update);
  }
}
