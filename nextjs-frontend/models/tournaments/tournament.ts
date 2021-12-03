import { TournamentRequest } from '../../service-clients/tournament-service/tournament-request';
import { getTimeAsLocal, parseToLocalJSDate, setDate, setTime } from '../../utils/date-time-utils';
import { TournamentValidator, tournamentValidator } from './tournament-validator';
import { TournamentResponse } from '../../service-clients/tournament-service/tournament-response';
import isEqual from 'lodash/isEqual';
import { GameResponse } from '../../service-clients/games-service/game-response';
import { NoobTime } from '../noob-types';

export type PartialTournament = Partial<TournamentResponse>;

type PartialTournamentKey = keyof PartialTournament;

const allKnownProps: PartialTournamentKey[] = [
  'tournamentName',
  'gameId',
  'platformId',
  'bestOfId',
  'mapId',
  'formatId',
  'scheduleDate',
  'rules',
  'isTeamParticipating',
  'numberOfParticipants',
  'tournamentType',
];

export default class Tournament {

  constructor(private dto: PartialTournament, private allGames: GameResponse[]) {
  }

  set<TKey extends PartialTournamentKey>(key: TKey, value: PartialTournament[TKey]) {
    if (key !== 'gameId') return new Tournament({...this.dto, [key]: value}, this.allGames);
    const mergedTournament = this.getMergedTournament(key, value);
    return new Tournament(mergedTournament, this.allGames);
  }

  private getMergedTournament<TKey extends PartialTournamentKey>(key: TKey, value: PartialTournament[TKey]) {
    return {
      ...this.dto,
      [key]: value,
      formatId: undefined,
      bestOfId: undefined,
      mapId: undefined,
      platformId: undefined
    };
  }

  getArray<TKey extends PartialTournamentKey>(key: TKey): PartialTournament[TKey][] {
    const value = this.get(key);
    return value == null ? [] : [value];
  }

  get<TKey extends PartialTournamentKey>(key: TKey): PartialTournament[TKey] {
    return this.dto[key];
  }

  setDate(date?: Date) {
    if (date == null) return this.set('scheduleDate', undefined);
    const mergedDate = setDate(date.toISOString(), this.dto.scheduleDate);
    return this.set('scheduleDate', mergedDate);
  }

  get date(): Date | undefined {
    return parseToLocalJSDate(this.dto.scheduleDate);
  }

  setTime(time: NoobTime) {
    if (this.dto.scheduleDate == null) return this;
    const timeToSet = {hour: time?.hours || 0, minute: time?.minutes || 0};
    return this.set('scheduleDate', setTime(timeToSet, this.dto.scheduleDate));
  }

  get time(): { hours?: number, minutes?: number } | undefined {
    if (this.dto.scheduleDate == null) return undefined;
    const timeAsLocal = getTimeAsLocal(this.dto.scheduleDate);
    return {
      hours: timeAsLocal?.hour,
      minutes: timeAsLocal?.minute
    };
  }

  getErrors(key: keyof TournamentValidator): string | undefined {
    const value = this.dto[key];
    const context = new Map<string, any>([['allGames', this.allGames]]);
    return (tournamentValidator[key])?.(value as any, this.dto, context);
  }

  get hasErrors(): boolean {
    return allKnownProps.some(prop => this.getErrors(prop) != undefined);
  }

  isEqual(other: Tournament | undefined): boolean {
    return isEqual(this.dto, other?.dto);
  }

  toRequest(): TournamentRequest {
    const {isOpenedToPublic, ...others} = (this.dto as TournamentResponse);
    return {...others};
  }
}
