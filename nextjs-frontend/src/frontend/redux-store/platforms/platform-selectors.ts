import { RootState } from '../redux-store';

export const getAllPlatformsSelector = (rootState: RootState) => rootState.platforms.platforms;
export const getAllPlatformsStatusSelector = (rootState: RootState) => rootState.platforms.platformFetchStatus;




