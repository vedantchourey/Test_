export interface IProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  countryId: string;
  stateId: string;
  agreeToTnc: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
  profileBackgroundImageUrl?: string;
}

export interface ISearchUser {
  username: string;
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}