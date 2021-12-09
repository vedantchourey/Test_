export interface IFrontendConfig {
  baseAppUrl: string;
  supabase: {
    apiUrl: string;
    anonKey: string;
  };
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
  }
}
