import {TournamentTypeCode} from '../../models/tournaments/TournamentType';

export class TournamentRequest {
  constructor(public readonly id: number | undefined,
              public readonly tournamentName: string,
              public readonly gameId: number,
              public readonly platformId: number,
              public readonly bestOfId: number,
              public readonly mapId: number,
              public readonly formatId: number,
              public readonly scheduleDate: string,
              public readonly rules: string,
              public readonly isTeamParticipating: boolean,
              public readonly numberOfParticipants: number,
              public readonly tournamentType: TournamentTypeCode) {
  }
}