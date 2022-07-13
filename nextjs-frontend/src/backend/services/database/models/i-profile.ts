export interface IProfile {
  id: string;
  username: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
  profileBackgroundImageUrl?: string;
  isBlocked?: boolean;
  suspended?: Date;
}

export interface ISearchUser {
  username: string;
  id: string;
  avatarUrl: string;
  isPrivate: string;
}
