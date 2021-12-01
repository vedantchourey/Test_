import { TournamentResponse } from '../../../service-clients/tournament-service/TournamentResponse';
import { GameResponse } from '../../../service-clients/games-service/GameResponse';
import MatchBestOfResponse from '../../../service-clients/match-best-of-service/MatchBestOfResponse';
import MatchFormatResponse from '../../../service-clients/match-format-service/MatchFormatResponse';
import PlatformResponse from '../../../service-clients/platforms-service/PlatformResponse';
import { toDisplayDateTime, toLocalDDMMYYYY } from '../../../utils/DateTimeUtils';

export default class TournamentDetailsModel {

  constructor(private tournament: TournamentResponse,
              private allGames: GameResponse[],
              private allBestOfs: MatchBestOfResponse[],
              private allMatchFormats: MatchFormatResponse[],
              private allPlatforms: PlatformResponse[]) {
  }

  get id(): number {
    return this.tournament.id;
  }

  get gameName(): string {
    return this.allGames.filter(x => x.id === this.tournament.gameId)[0]!.name;
  }

  get bestOfName(): string {
    return this.allBestOfs.filter(x => x.id === this.tournament.bestOfId)[0]!.displayName;
  }

  get matchFormatName(): string {
    return this.allMatchFormats.filter(x => x.id === this.tournament.formatId)[0]!.displayName;
  }

  get platformName(): string {
    return this.allPlatforms.filter(x => x.id === this.tournament.platformId)[0]!.displayName;
  }

  get mapName(): string | undefined {
    const game = this.allGames.filter(x => x.id === this.tournament.gameId)[0];
    if (game.maps == null || game.maps.length === 0) return '';
    const mapId = this.tournament.mapId;
    return game.maps.filter(x => x.id == mapId)[0].displayName;
  }

  get tournamentDateTime(): string {
    return toDisplayDateTime(this.tournament.scheduleDate);
  }

  get isOpenToPublic(): boolean {
    return this.tournament.isOpenedToPublic;
  }

}
