export interface ISearchRequest{
    search: string;
  }
export interface ISearchPeopleByUsernameResponse {
    username: string;
    id: string;
    avatarUrl: string;
}