import { GameResponse } from '../../service-clients/games-service/GameResponse';
import {DataFetchStatus} from '../DataFetchStatus';

export interface IGamesState {
  allGames: GameResponse[];
  fetchStatus: DataFetchStatus;
  updateStatus: DataFetchStatus;
  error?: any;
}
