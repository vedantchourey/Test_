import PlatformResponse from '../../service-clients/platforms-service/PlatformResponse';
import {DataFetchStatus} from '../DataFetchStatus';


export interface IPlatformState {
  allPlatforms: PlatformResponse[];
  status: DataFetchStatus;
  error?: any;
}
