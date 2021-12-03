import MatchBestOfResponse from '../../service-clients/match-best-of-service/match-best-of-response';
import { DataFetchStatus } from '../../models/noob-types';

export interface IMatchBestOfState {
  allMatchBestOfs: MatchBestOfResponse[];
  status: DataFetchStatus;
  error?: any;
}
