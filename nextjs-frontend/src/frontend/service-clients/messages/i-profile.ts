export interface IProfileResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  countryId: string;
  stateId: string;
  agreeToTnc: boolean;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
  profileBackgroundImageUrl?: string;
  userRoles: string[];
}
