import { AuthScreen } from '../../components/common/authentication/AuthScreenTypes';

export interface IAuthenticationState {
  isAuthenticated: boolean;
  role: string | undefined;
  checkStatus: 'idle' | 'loading' | 'success';
  isUserRequestingLogin: boolean;
  authScreen: AuthScreen;
}
