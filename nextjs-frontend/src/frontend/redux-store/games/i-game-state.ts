import { DataFetchStatus } from '../../../models/noob-types';
import { IGameResponse } from '../../service-clients/messages/i-game-response';

export interface IGameState {
  games: IGameResponse[];
  fetchStatus: DataFetchStatus;
  error: unknown;
  formats: any[]
}
