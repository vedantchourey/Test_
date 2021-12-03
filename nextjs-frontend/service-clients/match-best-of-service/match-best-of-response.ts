export default class MatchBestOfResponse {
  constructor(public readonly id: number,
              public readonly displayName: string,
              public readonly code: string,
              public readonly numberOfRounds: number) {
  }
}