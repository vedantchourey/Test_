import { RootState } from '../redux-store';
import { createSelector } from '@reduxjs/toolkit';
import { IPlatformResponse } from '../../service-clients/messages/i-platform-response';

export const getAllPlatformsSelector = (rootState: RootState) => rootState.platforms.platforms;
export const getAllPlatformsStatusSelector = (rootState: RootState) => rootState.platforms.platformFetchStatus;

// memoized



