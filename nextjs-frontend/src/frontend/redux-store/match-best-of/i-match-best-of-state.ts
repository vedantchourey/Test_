import { IMatchBestOfResponse } from '../../service-clients/messages/i-match-best-of-response';
import { DataFetchStatus } from '../../../models/noob-types';

export interface IMatchBestOfState {
  bestOfs: IMatchBestOfResponse[];
  fetchStatus: DataFetchStatus;
  error: any;
}
