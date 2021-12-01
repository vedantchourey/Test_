import {TournamentResponse} from '../../../service-clients/tournament-service/TournamentResponse';
import {DataFetchStatus} from '../../DataFetchStatus';

export interface IHomeScreenFilters {
  onlyShowMyTournaments: boolean;
  isEntryFeeRequired: boolean;
  platforms: number[];
}

export default interface IHomeScreenState {
  filters: IHomeScreenFilters;
  tournaments: {
    status: DataFetchStatus;
    data: TournamentResponse[];
    currentPageNumber: number;
    itemsPerPage: number;
    totalCount: number;
  }
  error?: any;
}