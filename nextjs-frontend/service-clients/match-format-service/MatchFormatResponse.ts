export default class MatchFormatResponse {
  constructor(public readonly id: number,
              public readonly displayName: string,
              public readonly code: string,
              public readonly peopleInEachTeam: number) {
  }
}