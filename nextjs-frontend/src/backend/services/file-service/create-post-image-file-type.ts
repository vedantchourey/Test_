import { IUploadFileType } from './i-upload-file-type';
import { v4 } from 'uuid';
import { IUploadedFile } from '../../utils/api-middle-ware/multi-part-file-upload-middle-ware/multi-part-definitions';
import { Knex } from 'knex';
import { PostsRepository } from '../database/repositories/posts-repository';
import { privateBackendSupabase } from '../common/supabase-backend-client';
import { PerRequestContext } from '../../utils/api-middle-ware/api-middleware-typings';
import { AllowedBuckets } from '../../../models/constants';


export class CreatePostImageFileType implements IUploadFileType {

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
    const newPostImgUrl = `post-img/_${v4()}`;
    const result = await this.uploadImage(newPostImgUrl, file);
    if (result.error != null) throw result.error;
    return newPostImgUrl;
  }

  private async uploadImage(postImgUrl: string, file: IUploadedFile): Promise<{ data: { Key: string } | null; error: Error | null }> {
    return privateBackendSupabase.storage
                                 .from(this.bucket)
                                 .upload(postImgUrl, file.fileContent as Buffer, {
                                   contentType: file.mimeType,
                                 });

  }

  validate(files: IUploadedFile[]): string | undefined {
    if (files.some((x) => x.invalidMime || x.limitExceeded)) return 'invalid upload or limit exceeded';
    if (files.length !== 1) return 'can only have one post image';
  }

}
