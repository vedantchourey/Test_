import MatchBestOfResponse from '../service-clients/match-best-of-service/match-best-of-response';

export default class MatchBestOf {

  constructor(private readonly dto: MatchBestOfResponse) {
  }

  get displayName(): string {
    return this.dto.displayName;
  }

  get code(): string {
    return this.dto.code;
  }

  get id(): number {
    return this.dto.id;
  }
}
