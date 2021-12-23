export interface IProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  countryId: number;
  stateId: number;
  agreeToTnc: boolean;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
  profileBackgroundImageUrl?: string
}
