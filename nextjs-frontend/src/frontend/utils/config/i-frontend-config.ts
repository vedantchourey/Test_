export interface IFrontendConfig {
  baseAppUrl: string;
  supabase: {
    apiUrl: string;
    anonKey: string;
  };
  noobStormServices: {
    auth: {
      signup: string;
    };
    profile: {
      profileImages: string;
    },
    tournament: {
      createUrl: string
    }
  }
}
