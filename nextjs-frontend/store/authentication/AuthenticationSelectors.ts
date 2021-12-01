import { RootState } from '../Store';

export const isAuthenticatedSelector = (rootState: RootState) => rootState.authentication.isAuthenticated;
export const authCheckStatusSelector = (rootState: RootState) => rootState.authentication.checkStatus;
export const isUserRequestingLoginSelector = (rootState: RootState) => rootState.authentication.isUserRequestingLogin;
export const authScreenToShowSelector = (rootState: RootState) => rootState.authentication.authScreen;
