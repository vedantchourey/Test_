import { IPlatform } from '../../../backend/services/database/models/i-platform';
import { DataFetchStatus } from '../../../models/noob-types';

export interface IPlatformState {
  platforms: IPlatform[];
  platformFetchStatus: DataFetchStatus;
  error: any;
}
