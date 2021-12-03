export interface IFrontendConfig {
  baseAppUrl: string;
  noobStormServices: {
    games: {
      searchUrl: string;
      updateUrl: string;
    },
    platforms: {
      searchUrl: string;
    },
    bestOfs: {
      searchUrl: string;
    },
    matchFormat: {
      searchUrl: string;
    }
    tournament: {
      createDraftUrl: string;
      editUrl: string;
      searchUrl: string;
      getByIdUrl: string;
      openToPublicUrl: string
    },
    country: {
      searchUrl: string;
      searchStatesUrl: string;
    }
  },
  aws: {
    region: string;
    cognito: {
      userPoolId: string;
      appClientId: string;
      region: string;
      hostedUiDomain: string;
      scope: string[];
      redirectSignInUrl: string;
      redirectSignOutUrl: string;
      responseType: 'code' | 'token';
      isAdvancedSecurityDataCollectionRequired: boolean;
    }
  }
  assets: {
    imageBasePath: string
  }
}
