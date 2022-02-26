import { IUploadFileType } from './i-upload-file-type';
import { v4 } from 'uuid';
import { IUploadedFile } from '../../utils/api-middle-ware/multi-part-file-upload-middle-ware/multi-part-definitions';
import { Knex } from 'knex';
import { PostsRepository } from '../database/repositories/posts-repository';
import { privateBackendSupabase } from '../common/supabase-backend-client';
import { PerRequestContext } from '../../utils/api-middle-ware/api-middleware-typings';
import { IPost } from '../database/models/i-post';
import { AllowedBuckets } from '../../../models/constants';
import { FileObject } from '@supabase/storage-js';


export class PostImageFileType implements IUploadFileType {

  private readonly postsRepository: PostsRepository;

  constructor(private context: PerRequestContext) {
    this.postsRepository = new PostsRepository(context.transaction as Knex.Transaction);
  }

  get bucket(): AllowedBuckets {
    return 'public-files';
  }

  async getPublicUrl(url: string): Promise<string | null> {
    const result = privateBackendSupabase.storage.from(this.bucket).getPublicUrl(url);
    if (result.error) throw result.error;
    return result.publicURL;
  }

  async uploadFile(file: IUploadedFile): Promise<string> {
    const post = await this.userPost();
    const oldPostImgUrl = post.postImgUrl;
    const newPostImgUrl = `post-img/${post.id}_${v4()}`;
    const result = await this.uploadImage(newPostImgUrl, file);
    if (result.error != null) throw result.error;
    await this.postsRepository.updatePostImg(post.id as string, newPostImgUrl);
    const deleteResult = await this.deleteImage(oldPostImgUrl);
    if (deleteResult.error != null) throw deleteResult.error;
    return newPostImgUrl;
  }

  private async uploadImage(postImgUrl: string, file: IUploadedFile): Promise<{ data: { Key: string } | null; error: Error | null }> {
    return privateBackendSupabase.storage
                                 .from(this.bucket)
                                 .upload(postImgUrl, file.fileContent as Buffer, {
                                   contentType: file.mimeType,
                                 });

  }

  private async deleteImage(postImgUrl: string | undefined): Promise<{ data: FileObject[] | null; error: Error | null }> {
    if (postImgUrl == null) return {data: [], error: null};
    return privateBackendSupabase.storage
                                 .from(this.bucket)
                                 .remove([postImgUrl]);

  }

  private async userPost(): Promise<IPost> {
    const post = await this.postsRepository.getPostById(this.context.getParamValue('postId') as string);
    if (post == null) throw new Error('post cannot be null');
    return post;
  }

  validate(files: IUploadedFile[]): string | undefined {
    if (files.some((x) => x.invalidMime || x.limitExceeded)) return 'invalid upload or limit exceeded';
    if (files.length !== 1) return 'can only have one post image';
  }

}
