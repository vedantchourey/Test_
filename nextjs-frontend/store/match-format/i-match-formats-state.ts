import MatchFormatResponse from '../../service-clients/match-format-service/match-format-response';
import { DataFetchStatus } from '../../models/noob-types';

export interface IMatchFormatsState {
  allMatchFormats: MatchFormatResponse[];
  status: DataFetchStatus;
  error?: any;
}
