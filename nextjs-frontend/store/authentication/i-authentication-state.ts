import { AuthScreenType } from '../../models/noob-types';

export interface IAuthenticationState {
  isAuthenticated: boolean;
  role: string | undefined;
  checkStatus: 'idle' | 'loading' | 'success';
  isUserRequestingLogin: boolean;
  authScreen: AuthScreenType;
}
