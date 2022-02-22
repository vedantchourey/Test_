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

export interface IOthersProfileResponse {
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
  state?: {
    displayName: string;
  };
  country?: {
    displayName: string;
  }
  totalFollowers: number;
  totalPosts: number;
  totalFollowing: number;
  isFollowing: boolean;
  isBlocked: boolean;
}