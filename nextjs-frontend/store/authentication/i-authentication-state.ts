import { AuthScreenType, DataFetchStatus } from '../../models/noob-types';
import UserProfileResponse from '../../services/front-end-services/auth/user-profile-response';

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
}
