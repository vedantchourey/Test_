import { RootState } from '../redux-store';
import { createSelector } from '@reduxjs/toolkit';
import { IProfileResponse } from '../../service-clients/messages/i-profile';


export const isLoggedInSelector = (rootState: RootState) => rootState.authentication.isAuthenticated;
export const authCheckStatusSelector = (rootState: RootState) => rootState.authentication.checkStatus;
export const userProfileSelector = (rootState: RootState) => rootState.authentication.userProfile;
export const userProfileFetchStatusSelector = (rootState: RootState) => rootState.authentication.profileFetchStatus;
export const avatarImageBlobUrlSelector = (rootState: RootState) => rootState.authentication.avatarImageBlob;
export const avatarBackgroundImageBlobUrlSelector = (rootState: RootState) => rootState.authentication.avatarBackgroundImageBlob;
export const userRolesSelector = (rootState: RootState) => rootState.authentication.userProfile?.userRoles;
export const forceFetchAvatarImageBlobSelector = (rootState: RootState) => rootState.authentication.forceFetchAvatarImageBlob;
export const forceFetchAvatarBackgroundImageBlobSelector = (rootState: RootState) => rootState.authentication.forceFetchAvatarBackgroundImageBlob;

// memoized
const accessTokenUsernameSelector = (rootState: RootState) => rootState.authentication.username;

export const userNameSelector = createSelector([accessTokenUsernameSelector, userProfileSelector], (tokenUsername: string | undefined, userProfile: IProfileResponse | undefined) => {
  if (userProfile?.username != null) return userProfile.username;
  return tokenUsername || '';
});
