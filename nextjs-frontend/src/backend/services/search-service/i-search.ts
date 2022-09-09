export interface ISearchRequest{
  search: string;
  range?: number;
}

export interface ISearchResponse {
  id: string;
  username: string;
  avatarUrl: string;
}