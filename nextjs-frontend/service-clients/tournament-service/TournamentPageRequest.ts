export interface TournamentPageRequest {
  pageNumber: number;
  itemsPerPage: number;
  onlyShowMyTournaments?: boolean;
  isEntryFeeRequired?: boolean;
  platformIds?: number[];
  isOpenedToPublic?: boolean;
}