import { IPlatformResponse } from '../../service-clients/messages/i-platform-response';
import { DataFetchStatus } from '../../../models/noob-types';

export interface IPlatformState {
  platforms: IPlatformResponse[];
  platformFetchStatus: DataFetchStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}
