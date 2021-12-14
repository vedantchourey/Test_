import { RootState } from '../redux-store';
import { createSelector } from '@reduxjs/toolkit';
import UserProfileResponse from '../../services/front-end-services/auth/user-profile-response';

export const isLoggedInSelector = (rootState: RootState) => rootState.authentication.isAuthenticated;
export const authCheckStatusSelector = (rootState: RootState) => rootState.authentication.checkStatus;
export const userProfileSelector = (rootState: RootState) => rootState.authentication.userProfile;
export const userProfileFetchStatusSelector = (rootState: RootState) => rootState.authentication.profileFetchStatus;

// memoized
const accessTokenUsernameSelector = (rootState: RootState) => rootState.authentication.username;

export const userNameSelector = createSelector([accessTokenUsernameSelector, userProfileSelector], (tokenUsername: string | undefined, userProfile: UserProfileResponse | undefined) => {
  if (userProfile?.username != null) return userProfile.username;
  return tokenUsername || '';
});
