import { IGame } from '../../../backend/services/database/models/i-game';
import { DataFetchStatus } from '../../../models/noob-types';

export interface IGameState {
  games: IGame[];
  fetchStatus: DataFetchStatus;
  error: any;
}
