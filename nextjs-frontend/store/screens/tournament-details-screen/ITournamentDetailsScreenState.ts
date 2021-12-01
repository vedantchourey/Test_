import { TournamentResponse } from '../../../service-clients/tournament-service/TournamentResponse';
import { DataFetchStatus } from '../../DataFetchStatus';

export default interface ITournamentDetailsScreenState {
  tournament?: TournamentResponse;
  fetchStatus: DataFetchStatus;
  error?: any;
}
