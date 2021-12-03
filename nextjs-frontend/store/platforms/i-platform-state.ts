import PlatformResponse from '../../service-clients/platforms-service/platform-response';
import { DataFetchStatus } from '../../models/noob-types';


export interface IPlatformState {
  allPlatforms: PlatformResponse[];
  status: DataFetchStatus;
  error?: any;
}
