export interface PageResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber?: number;
  itemsPerPage?: number;
}