import { DataFetchStatus } from '../../../models/noob-types';
import { IProfileResponse } from '../../service-clients/messages/i-profile';

export interface IAuthenticationState {
  isAuthenticated: boolean;
  role: string | undefined;
  checkStatus: 'idle' | 'loading' | 'success';
  isUserRequestingLogin: boolean;
  profileFetchStatus: DataFetchStatus;
  userProfile: IProfileResponse | undefined;
  // temp cache from auth token
  username: string | undefined;
  avatarUrl: string | undefined;
  avatarBackgroundUrl: string | undefined;
}
