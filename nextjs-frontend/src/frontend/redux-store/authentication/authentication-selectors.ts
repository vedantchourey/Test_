import { RootState } from '../redux-store';
import { createSelector } from '@reduxjs/toolkit';
import { IProfileResponse } from '../../service-clients/messages/i-profile';
import { AuthCheckStatus } from './i-authentication-state';
import { DataFetchStatus } from '../../../models/noob-types';


export const isLoggedInSelector = (rootState: RootState): boolean => rootState.authentication.isAuthenticated;
export const authCheckStatusSelector = (rootState: RootState): AuthCheckStatus=> rootState.authentication.checkStatus;
export const userProfileSelector = (rootState: RootState): IProfileResponse | undefined => rootState.authentication.userProfile;
export const userProfileFetchStatusSelector = (rootState: RootState): DataFetchStatus => rootState.authentication.profileFetchStatus;
export const avatarImageBlobUrlSelector = (rootState: RootState): string | undefined => rootState.authentication.avatarImageBlob;
export const avatarBackgroundImageBlobUrlSelector = (rootState: RootState): string | undefined => rootState.authentication.avatarBackgroundImageBlob;
export const userRolesSelector = (rootState: RootState): string[] | undefined => rootState.authentication.userProfile?.userRoles;
export const forceFetchAvatarImageBlobSelector = (rootState: RootState): string => rootState.authentication.forceFetchAvatarImageBlob;
export const forceFetchAvatarBackgroundImageBlobSelector = (rootState: RootState): string => rootState.authentication.forceFetchAvatarBackgroundImageBlob;

// memoized
const accessTokenUsernameSelector = (rootState: RootState): string | undefined => rootState.authentication.username;

export const userNameSelector = createSelector([accessTokenUsernameSelector, userProfileSelector], (tokenUsername: string | undefined, userProfile: IProfileResponse | undefined) => {
  if (userProfile?.username != null) return userProfile.username;
  return tokenUsername || '';
});
