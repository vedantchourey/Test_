export interface SignupRequest {
  phone: string;
  email: string;
  password: string;
  provider?: 'facebook' | 'apple' | 'google';
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  countryId: string;
  stateId: string;
  agreeToTnc: boolean;
  isPrivate: boolean;
}


export interface SignupResponse {
  userId: string | undefined;
}
