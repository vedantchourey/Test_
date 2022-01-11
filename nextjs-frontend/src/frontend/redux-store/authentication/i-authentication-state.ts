import { NoobUserRole } from '../../../backend/utils/api-middle-ware/noob-user-role';
import { DataFetchStatus } from '../../../models/noob-types';
import { IProfile } from '../../../backend/services/database/models/i-profile';

export interface IAuthenticationState {
  isAuthenticated: boolean;
  role: string | undefined;
  checkStatus: 'idle' | 'loading' | 'success';
  isUserRequestingLogin: boolean;
  profileFetchStatus: DataFetchStatus;
  userProfile: IProfile | undefined;
  // temp cache from auth token
  username: string | undefined;
  avatarUrl: string | undefined;
  avatarBackgroundUrl: string | undefined;
  userRoles: NoobUserRole[];
}
