import GameMapResponse from '../service-clients/games-service/GameMapResponse';
import {v4 as uuidv4} from 'uuid';
import UpdateGameMapRequest from '../service-clients/games-service/UpdateGameMapRequest';

export default class GameMap {

  public readonly uuid: string;

  constructor(private dto: GameMapResponse | UpdateGameMapRequest) {
    this.uuid = uuidv4()
  }

  get name(): string {
    return this.dto.displayName;
  }

  get code(): string {
    return this.dto.code;
  }

  get id(): number | undefined {
    return this.dto.id;
  }

  edit(mapName: string, mapCode: string): GameMap {
    return new GameMap({...this.dto, code: mapCode, displayName: mapName});
  }

  toUpdateRequest(): UpdateGameMapRequest {
    return {...this.dto};
  }
}
