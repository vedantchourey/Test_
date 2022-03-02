import {AllowedBuckets} from '../../../models/constants';

export interface IFrontendConfig {
  baseAppUrl: string;
  supabase: {
    apiUrl: string;
    anonKey: string
  };
  noobStormServices: {
    auth: {
      signup: string;
      resetPassword: string;
      sendResetPasswordLink: string
    };
    profile: {
      profileImages: string;
      privacyAction: {
        privateProfileUrl: string;
        publicProfileUrl: string;
      }
      searchByUsername: (username: string) => string;
    },
    tournament: {
      createUrl: string,
      getById: string
    },
    post: {
      createUrl: string,
      postImageUploadUrl: string;
      likePostUrl: (postId: string) => string;
      unlikePostUrl: (postId: string) => string;
      createCommentUrl: (postId: string) => string;
      deleteCommentUrl: (postId: string, commentId: string) => string;
      updatePostUrl: (postId: string) => string;
      deletePostUrl: (postId: string) => string;
      updateCommentUrl: (postId: string, commentId: string) => string;
    }
    followActions: {
      followUserUrl: (userId: string) => string;
      unFollowUserUrl: (userId: string) => string;
    },
    uploads: {
      setAvatar: string;
      setProfileBackground: string;
    }
    blockActions: {
      block: (userId: string) => string;
      unBlock: (userId: string) => string;
    }
    search: {
      searchUser: string; 
    }
  },
  storage : {
    publicBucket : AllowedBuckets;
    publicBucketUrl : string;
  }
}
