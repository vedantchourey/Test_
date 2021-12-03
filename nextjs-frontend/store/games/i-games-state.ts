import { GameResponse } from '../../service-clients/games-service/game-response';
import { DataFetchStatus } from '../../models/noob-types';

export interface IGamesState {
  allGames: GameResponse[];
  fetchStatus: DataFetchStatus;
  updateStatus: DataFetchStatus;
  error?: any;
}
