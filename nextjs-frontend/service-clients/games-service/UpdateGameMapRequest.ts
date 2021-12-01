export default class UpdateGameMapRequest {
  constructor(public readonly displayName: string,
              public readonly code: string,
              public readonly id?: number) {
  }
}
