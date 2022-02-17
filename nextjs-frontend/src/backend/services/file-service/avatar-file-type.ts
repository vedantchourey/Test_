import { IFileType } from './i-file-type';
import { v4 } from 'uuid';
import { IUploadedFile } from '../../utils/api-middle-ware/multi-part-file-upload-middle-ware/multi-part-definitions';
import { Knex } from 'knex';
import { ProfilesRepository } from '../database/repositories/profiles-repository';
import { createAuthenticatedBackendSupabase } from '../common/supabase-backend-client';
import { PerRequestContext } from '../../utils/api-middle-ware/api-middleware-typings';
import { IProfile } from '../database/models/i-profile';
import { SupabaseClient } from '@supabase/supabase-js';


export class AvatarFileType implements IFileType {

  private readonly profilesRepository: ProfilesRepository;
  private readonly supabaseClient: SupabaseClient;

  constructor(private context: PerRequestContext) {
    this.context.assertIsLoggedIn();
    this.profilesRepository = new ProfilesRepository(context.transaction as Knex.Transaction);
    this.supabaseClient = createAuthenticatedBackendSupabase(this.context.jwt as string);
  }

  get bucket(): string {
    return 'resources';
  }

  async getPublicUrl(url: string): Promise<string | null> {
    const result = this.supabaseClient.storage.from(this.bucket).getPublicUrl(url);
    if (result.error) throw result.error;
    return result.publicURL;
  }

  async uploadFile(file: IUploadedFile): Promise<string> {
    const profile = await this.userProfile();
    const avatarUrl = profile.avatarUrl || `avatars/avatar${profile.id}${v4()}`;
    const result = await this.uploadOrUpdateImage(this.supabaseClient, avatarUrl, file, profile);
    if (result.error != null) throw result.error;
    if (profile.avatarUrl != null) return avatarUrl;
    await this.profilesRepository.updateAvatar(profile.id, result.data?.Key as string);
    return avatarUrl;
  }

  private async uploadOrUpdateImage(supabaseClient: SupabaseClient, avatarUrl: string, file: IUploadedFile, profile: IProfile): Promise<{ data: { Key: string } | null; error: Error | null }> {
    if (profile.avatarUrl == null) return supabaseClient.storage
                                                        .from(this.bucket)
                                                        .upload(avatarUrl, file.fileContent as Buffer);
    return supabaseClient.storage.from(this.bucket).update(avatarUrl, file.fileContent as Buffer);
  }

  private async userProfile(): Promise<IProfile> {
    const profile = await this.profilesRepository.getProfileById(this.context.user?.id as string);
    if (profile == null) throw new Error('profile cannot be null');
    return profile;
  }

  validate(files: IUploadedFile[]): string | undefined {
    if (files.some((x) => x.invalidMime || x.limitExceeded)) return 'invalid upload';
    if (files.length !== 1) return 'can only have on avatar image';
  }


}
