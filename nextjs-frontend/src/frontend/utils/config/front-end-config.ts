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
      profileImages: `${baseApiUrl}/api/profile-images`
    },
    tournament: {
      createUrl: `${baseApiUrl}/api/tournaments`,
      getById: `${baseApiUrl}/api/tournaments/{id}`,
    },
    post: {
      createUrl: `${baseApiUrl}/api/posts`,
      likePostUrl: (postId: string): string => `${baseApiUrl}/api/posts/${postId}/likes`,
      unlikePostUrl: (postId: string): string => `${baseApiUrl}/api/posts/${postId}/likes`
    },
    comment: {
      createUrl: `${baseApiUrl}/api/posts/{POST_ID}/comments`
    },
    followActions : {
      followUser : `${baseApiUrl}/api/followers/following`,
      unFollowUser : `${baseApiUrl}/api/followers/unfollow`,
    }
  },
  supabase: {
    anonKey: supabaseAnonKey,
    apiUrl: supabaseUrl
  }
}

export default frontendConfig;
