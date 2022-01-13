import { IGameMapResponse } from './i-game-map-response';

export interface IGameResponse {
  id: string;
  displayName: string;
  code: string;
  platformIds: string[];
  gameMaps: IGameMapResponse[];
}
