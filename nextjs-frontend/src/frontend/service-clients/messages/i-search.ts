export interface ISearchRequest{
    search: string;
  }
export interface ISearchPeopleByUsernameResponse {
    username: string;
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
}