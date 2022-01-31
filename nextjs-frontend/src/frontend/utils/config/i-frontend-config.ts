export interface IFrontendConfig {
  baseAppUrl: string;
  supabase: {
    apiUrl: string;
    anonKey: string;
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
    }
  }
}
