export interface ISearchRequest{
  search: string;
}

export interface ISearchResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}