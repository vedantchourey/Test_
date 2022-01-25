import { DataFetchStatus } from '../../../models/noob-types';
import { IGameResponse } from '../../service-clients/messages/i-game-response';

export interface IGameState {
  games: IGameResponse[];
  fetchStatus: DataFetchStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}
