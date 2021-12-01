import {DataFetchStatus} from '../../DataFetchStatus';
import {TournamentResponse} from '../../../service-clients/tournament-service/TournamentResponse';
import {TournamentPageRequest} from '../../../service-clients/tournament-service/TournamentPageRequest';

export interface ITournamentAdminListScreenState {
  listFetchStatus: DataFetchStatus;
  pageDetails: {
    data: TournamentResponse[];
    totalCount?: number;
    pageNumber?: number;
    itemsPerPage?: number;
  };
  error?: any;
  pageFilterCriteria: TournamentPageRequest;
}
