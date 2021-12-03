import UpdateGameMapRequest from './update-game-map-request';

export class UpdateGameRequest {
  constructor(
    public readonly name: string,
    public readonly code: string,
    public readonly platformIds: number[],
    public readonly formatIds: number[],
    public readonly bestOfIds: number[],
    public readonly maps: UpdateGameMapRequest[]
  ) {
  }
}
