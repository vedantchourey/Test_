export interface IFrontendConfig {
  baseAppUrl: string;
  supabase: {
    apiUrl: string;
    anonKey: string;
    storage : {
      getObjectUrl : (filepath : string, token? : string) => string; 
    };
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
    post :{
      createUrl : string
    }
  }
}
