export interface ISearchRequest{
    search: string;
    range?: number; 
  }
export interface ISearchPeopleByUsernameResponse {
    username: string;
    id: string;
    avatarUrl: string;
}