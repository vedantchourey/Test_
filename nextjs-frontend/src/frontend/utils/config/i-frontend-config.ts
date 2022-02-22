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
    },
    tournament: {
      createUrl: string,
      getById: string
    },
    post: {
      createUrl: string,
      likePostUrl: (postId: string) => string;
      unlikePostUrl: (postId: string) => string;
      createCommentUrl: (postId: string) => string;
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
  }
}
