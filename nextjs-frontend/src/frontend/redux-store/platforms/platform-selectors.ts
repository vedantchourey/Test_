import { RootState } from '../redux-store';
import { IPlatformResponse } from '../../service-clients/messages/i-platform-response';
import { DataFetchStatus } from '../../../models/noob-types';

export const getAllPlatformsSelector = (rootState: RootState): IPlatformResponse[] => rootState.platforms.platforms;
export const getAllPlatformsStatusSelector = (rootState: RootState): DataFetchStatus => rootState.platforms.platformFetchStatus;




