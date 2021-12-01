import {GameResponse} from '../service-clients/games-service/GameResponse';
import GameMap from './GameMap';
import {UpdateGameRequest} from '../service-clients/games-service/UpdateGameRequest';

export default class Game {

  private gameMaps: GameMap[];
  private localCopy: GameResponse;


  constructor(private readonly dto: GameResponse) {
    this.gameMaps = dto.maps?.map(x => new GameMap(x)) || [];
    this.localCopy = {
      ...dto,
      maps: [...this.dto.maps.map(x => {
        return {...x};
      })]
    };
  }

  get response(): GameResponse {
    return {...this.localCopy};
  }

  get id(): number {
    return this.localCopy.id
  }

  get name(): string {
    return this.localCopy.name;
  }

  get code(): string {
    return this.localCopy.code;
  }

  get platformIds(): number[] {
    return this.localCopy.platformIds
  }

  set platformIds(ids: number[]) {
    this.localCopy = {...this.localCopy, platformIds: ids};
  }

  get formatIds(): number[] {
    return this.localCopy.formatIds
  }

  set formatIds(ids: number[]) {
    this.localCopy = {...this.localCopy, formatIds: ids};
  }

  get bestOfIds(): number[] {
    return this.localCopy.bestOfIds
  }

  set bestOfIds(ids: number[]) {
    this.localCopy = {...this.localCopy, bestOfIds: ids};
  }

  get maps(): GameMap[] {
    return this.gameMaps;
  }

  get mapsIds(): number[] {
    return this.localCopy.maps.map(x => x.id);
  }

  set maps(maps: GameMap[]) {
    this.gameMaps = maps;
  }

  toUpdateRequest(): UpdateGameRequest {
    return {
      ...this.localCopy,
      maps: [
        ...this.gameMaps.map(x => x.toUpdateRequest())
      ]
    }
  }

}
