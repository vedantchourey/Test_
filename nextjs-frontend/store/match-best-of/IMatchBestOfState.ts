import {DataFetchStatus} from '../DataFetchStatus';
import MatchBestOfResponse from '../../service-clients/match-best-of-service/MatchBestOfResponse';

export interface IMatchBestOfState {
  allMatchBestOfs: MatchBestOfResponse[];
  status: DataFetchStatus;
  error?: any;
}
