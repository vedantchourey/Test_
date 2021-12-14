export default interface UserProfileResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  countryId: number;
  stateId: number;
  agreeToTnc: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}
