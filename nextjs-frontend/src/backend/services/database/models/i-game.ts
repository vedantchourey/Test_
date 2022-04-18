export interface IGameMap {
  id: string;
  code: string;
  gameId: string;
  displayName: string;
}

export interface IGame {
  id: string;
  displayName: string;
  code: string;
}

export interface IGamePaltform {
  gameId: string;
  platformId: string;
  gameName: string;
  platformName: string;
}
