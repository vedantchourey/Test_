export interface IPost {
  id?: string;
  postContent: string;
  postImgUrl: string;
  postedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}
