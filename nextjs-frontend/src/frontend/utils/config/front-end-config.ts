import { IFrontendConfig } from './i-frontend-config';

const baseAppUrl = process.env.NEXT_PUBLIC_NOOB_BASE_APP_URL || 'http://localhost:19006';
const baseApiUrl = process.env.NEXT_PUBLIC_NOOB_BASE_API_URL || 'http://localhost:5000';
const supabaseUrl = process.env.NEXT_PUBLIC_NOOB_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = process.env.NEXT_PUBLIC_NOOB_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.ZopqoUt20nEV9cklpv9e3yw3PVyZLmKs5qLD6nGL1SI';

const frontendConfig: IFrontendConfig = {
  baseAppUrl: baseAppUrl,
  noobStormServices: {
    auth: {
      signup: `${baseApiUrl}/api/sign-up`,
      resetPassword: `${baseApiUrl}/api/reset-password`,
      sendResetPasswordLink: `${baseApiUrl}/api/send-reset-password-link`,
    },
    profile: {
      profileImages: `${baseApiUrl}/api/profile-images`,
      privacyAction: {
        privateProfileUrl: `${baseApiUrl}/api/update-account-privacy/private`,
        publicProfileUrl: `${baseApiUrl}/api/update-account-privacy/public`
      },
      searchByUsername : (username : string):string => `${baseApiUrl}/api/search/${username}` 
    },
    tournament: {
      createUrl: `${baseApiUrl}/api/tournaments`,
      getById: `${baseApiUrl}/api/tournaments/{id}`,
    },
    post: {
      createUrl: `${baseApiUrl}/api/posts`,
      postImageUploadUrl: `${baseApiUrl}/api/uploads/post`,
      likePostUrl: (postId: string): string => `${baseApiUrl}/api/posts/${postId}/likes`,
      unlikePostUrl: (postId: string): string => `${baseApiUrl}/api/posts/${postId}/likes`,
      createCommentUrl: (postId: string): string => `${baseApiUrl}/api/posts/${postId}/comments`,
      deleteCommentUrl: (postId: string, commentId: string) => `${baseApiUrl}/api/posts/${postId}/comments/${commentId}`,
      updatePostUrl: (postId: string) => `${baseApiUrl}/api/posts/${postId}`
    },
    followActions: {
      followUserUrl: (userId: string) => `${baseApiUrl}/api/follow-action/following/${userId}`,
      unFollowUserUrl: (userId: string) => `${baseApiUrl}/api/follow-action/unfollow/${userId}`,
    },
    blockActions: {
      block: (userId: string) => `${baseApiUrl}/api/block-action/block/${userId}`,
      unBlock: (userId: string) => `${baseApiUrl}/api/block-action/unblock/${userId}`,
    },
    uploads: {
      setAvatar: `${baseApiUrl}/api/uploads/avatars`,
      setProfileBackground: `${baseApiUrl}/api/uploads/profile-background`
    },
    search: {
      searchUser: `${baseApiUrl}/api/search`
    },
  },
  supabase: {
    anonKey: supabaseAnonKey,
    apiUrl: supabaseUrl
  },
  storage : {
    publicBucket : 'public-files',
    publicBucketUrl : `${supabaseUrl}/storage/v1/object/public`
  }
}

export default frontendConfig;
