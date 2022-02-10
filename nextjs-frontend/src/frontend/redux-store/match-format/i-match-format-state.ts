import { DataFetchStatus } from '../../../models/noob-types';
import { IMatchFormatResponse } from '../../service-clients/messages/i-match-format-response';

export interface IMatchFormatState {
  matchFormats: IMatchFormatResponse[];
  fetchStatus: DataFetchStatus;
  error: unknown;
}
