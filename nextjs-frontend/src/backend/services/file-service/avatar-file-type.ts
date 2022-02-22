import { IUploadFileType } from './i-upload-file-type';
import { v4 } from 'uuid';
import { IUploadedFile } from '../../utils/api-middle-ware/multi-part-file-upload-middle-ware/multi-part-definitions';
import { Knex } from 'knex';
import { ProfilesRepository } from '../database/repositories/profiles-repository';
import { privateBackendSupabase } from '../common/supabase-backend-client';
import { PerRequestContext } from '../../utils/api-middle-ware/api-middleware-typings';
import { IProfile } from '../database/models/i-profile';
import { AllowedBuckets } from '../../../models/constants';
import { FileObject } from '@supabase/storage-js';


export class AvatarFileType implements IUploadFileType {

  private readonly profilesRepository: ProfilesRepository;

  constructor(private context: PerRequestContext) {
    this.profilesRepository = new ProfilesRepository(context.transaction as Knex.Transaction);
  }

  get bucket(): AllowedBuckets {
    return 'public_files';
  }

  async getPublicUrl(url: string): Promise<string | null> {
    const result = privateBackendSupabase.storage.from(this.bucket).getPublicUrl(url);
    if (result.error) throw result.error;
    return result.publicURL;
  }

  async uploadFile(file: IUploadedFile): Promise<string> {
    const profile = await this.userProfile();
    const oldAvatar = profile.avatarUrl;
    const newAvatarUrl = `avatars/${profile.id}_${v4()}`;
    const result = await this.uploadImage(newAvatarUrl, file);
    if (result.error != null) throw result.error;
    await this.profilesRepository.updateAvatar(profile.id, newAvatarUrl);
    const deleteResult = await this.deleteImage(oldAvatar);
    if (deleteResult.error != null) throw deleteResult.error;
    return newAvatarUrl;
  }

  private async uploadImage(avatarUrl: string, file: IUploadedFile): Promise<{ data: { Key: string } | null; error: Error | null }> {
    return privateBackendSupabase.storage
                                 .from(this.bucket)
                                 .upload(avatarUrl, file.fileContent as Buffer, {
                                   contentType: file.mimeType,
                                 });

  }

  private async deleteImage(avatarUrl: string | undefined): Promise<{ data: FileObject[] | null; error: Error | null }> {
    if (avatarUrl == null) return {data: [], error: null};
    return privateBackendSupabase.storage
                                 .from(this.bucket)
                                 .remove([avatarUrl]);

  }

  private async userProfile(): Promise<IProfile> {
    const profile = await this.profilesRepository.getProfileById(this.context.user?.id as string);
    if (profile == null) throw new Error('profile cannot be null');
    return profile;
  }

  validate(files: IUploadedFile[]): string | undefined {
    if (files.some((x) => x.invalidMime || x.limitExceeded)) return 'invalid upload or limit exceeded';
    if (files.length !== 1) return 'can only have on avatar image';
  }

}
