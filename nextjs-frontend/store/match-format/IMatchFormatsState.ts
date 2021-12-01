import {DataFetchStatus} from '../DataFetchStatus';
import MatchFormatResponse from '../../service-clients/match-format-service/MatchFormatResponse';

export interface IMatchFormatsState {
  allMatchFormats: MatchFormatResponse[];
  status: DataFetchStatus;
  error?: any;
}
