import GameMapResponse from './game-map-response';

export class GameResponse {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly code: string,
    public readonly platformIds: number[],
    public readonly formatIds: number[],
    public readonly bestOfIds: number[],
    public readonly maps: GameMapResponse[]
  ) {
  }
}
