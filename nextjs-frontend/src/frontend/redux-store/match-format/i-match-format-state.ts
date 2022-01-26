import { DataFetchStatus } from '../../../models/noob-types';
import { IMatchFormatResponse } from '../../service-clients/messages/i-match-format-response';

export interface IMatchFormatState {
  matchFormats: IMatchFormatResponse[];
  fetchStatus: DataFetchStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}
