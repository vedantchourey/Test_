export class StateResponse {

  constructor(public readonly id: number,
              public readonly isoCode: string,
              public readonly displayName: string,
              public readonly countryId: number) {
  }
}
