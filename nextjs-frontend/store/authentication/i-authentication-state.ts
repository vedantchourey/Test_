import { AuthScreenType, DataFetchStatus } from '../../models/noob-types';
import UserProfileResponse from '../../services/front-end-services/user-profile-response';
import { NoobUserRole } from '../../utils/api-middle-ware/noob-user-role';

export interface IAuthenticationState {
  isAuthenticated: boolean;
  role: string | undefined;
  checkStatus: 'idle' | 'loading' | 'success';
  isUserRequestingLogin: boolean;
  authScreen: AuthScreenType;
  profileFetchStatus: DataFetchStatus;
  userProfile: UserProfileResponse | undefined;
  // temp cache from auth token
  username: string | undefined;
  avatarUrl: string | undefined;
  avatarBackgroundUrl: string | undefined;
  userRoles: NoobUserRole[];
}
