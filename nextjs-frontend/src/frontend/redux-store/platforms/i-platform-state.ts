import { IPlatformResponse } from '../../service-clients/messages/i-platform-response';
import { DataFetchStatus } from '../../../models/noob-types';

export interface IPlatformState {
  platforms: IPlatformResponse[];
  platformFetchStatus: DataFetchStatus;
  error: unknown;
}
