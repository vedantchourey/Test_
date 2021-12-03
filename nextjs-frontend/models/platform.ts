import PlatformResponse from '../service-clients/platforms-service/platform-response';

export default class Platform {
  constructor(private dto: PlatformResponse) {
  }

  get code() {
    return this.dto.code;
  }

  get id() {
    return this.dto.id;
  }

  get displayName() {
    return this.dto.displayName;
  }
}
