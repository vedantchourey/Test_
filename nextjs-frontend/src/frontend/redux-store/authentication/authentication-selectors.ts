import { RootState } from '../redux-store';
import { createSelector } from '@reduxjs/toolkit';
import { IProfileResponse } from '../../service-clients/messages/i-profile';


export const isLoggedInSelector = (rootState: RootState) => rootState.authentication.isAuthenticated;
export const authCheckStatusSelector = (rootState: RootState) => rootState.authentication.checkStatus;
export const userProfileSelector = (rootState: RootState) => rootState.authentication.userProfile;
export const userProfileFetchStatusSelector = (rootState: RootState) => rootState.authentication.profileFetchStatus;
export const avatarUrlSelector = (rootState: RootState) => rootState.authentication.avatarUrl;
export const avatarBackgroundUrlSelector = (rootState: RootState) => rootState.authentication.avatarBackgroundUrl;
export const userRolesSelector = (rootState: RootState) => rootState.authentication.userProfile?.userRoles;

// memoized
const accessTokenUsernameSelector = (rootState: RootState) => rootState.authentication.username;

export const userNameSelector = createSelector([accessTokenUsernameSelector, userProfileSelector], (tokenUsername: string | undefined, userProfile: IProfileResponse | undefined) => {
  if (userProfile?.username != null) return userProfile.username;
  return tokenUsername || '';
});
