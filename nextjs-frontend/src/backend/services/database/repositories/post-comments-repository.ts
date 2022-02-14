import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { IPostComment } from '../models/i-post-comment';
import { nowAsJsDate } from '../../../../common/utils/date-time-utils';

interface IUpdateComment {
  comment: string;
}

<<<<<<< HEAD
export class PostCommentsRepository extends BaseRepository<IPostComments>{
=======
export class PostCommentsRepository extends BaseRepository<IPostComment> {
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
  constructor(transaction: Knex.Transaction) {
    super(transaction, 'post_comments');
  }

<<<<<<< HEAD
  async createComment(comment: IPostComments) {
    return await this.entities().insert(comment);
  }

  async getCommentById(id: string) {
    return await this.entities().select('*')
.first()
.where('id', id)
  }

  async countCommentById(id: string): Promise<number> {
    const result = await this.entities().whereRaw("id = ?", [id])
            .count('id');
    return parseInt(result[0].count, 10);
  }

  async deleteComment(id: string, userId: string) {
    console.log({id, userId})
    return await this.entities().where({ id: id, commentBy: userId })
.del()
  }

  async updateComment(id: string, update: IUpdateComment): Promise<any> {
    return await this.entities().where('id', id)
.update(update);
  }
}
=======
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
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
