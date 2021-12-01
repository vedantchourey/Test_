export class CountryResponse {

  constructor(public readonly id: number,
              public readonly isoCode: string,
              public readonly displayName: string) {
  }
}
