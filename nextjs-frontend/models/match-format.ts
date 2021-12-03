import MatchFormatResponse from '../service-clients/match-format-service/match-format-response';

export default class MatchFormat {

  constructor(private dto: MatchFormatResponse) {
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
