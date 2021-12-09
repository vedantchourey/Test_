// @ts-check

const baseAppUrl = process.env.NOOB_BASE_APP_URL || 'http://localhost:19006';
const baseApiUrl = process.env.NOOB_BASE_API_URL || 'http://localhost:5000';
const databaseName = process.env.NOOB_DATA_BASE_NAME || 'postgres';
const dbHost = process.env.NOOB_DATA_BASE_HOST || 'localhost';
const dbPort = process.env.NOOB_DATA_BASE_PORT || 54322;
const dbUser = process.env.NOOB_DATA_BASE_USER || 'postgres';
const dbPassword = process.env.NOOB_DATA_BASE_PASSWORD || 'postgres';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.ZopqoUt20nEV9cklpv9e3yw3PVyZLmKs5qLD6nGL1SI';

/**
 * @type {import('./utils/config/i-frontend-config.ts').IFrontendConfig}
 **/
const frontendConfig = {
  baseAppUrl: baseAppUrl,
  noobStormServices: {
    games: {
      searchUrl: `${baseApiUrl}/noob-service/games`,
      updateUrl: `${baseApiUrl}/noob-service/games`
    },
    bestOfs: {
      searchUrl: `${baseApiUrl}/noob-service/match-best-ofs`
    },
    matchFormat: {
      searchUrl: `${baseApiUrl}/noob-service/math-formats`
    },
    platforms: {
      searchUrl: `${baseApiUrl}/noob-service/platforms`
    },
    tournament: {
      searchUrl: `${baseApiUrl}/noob-service/tournaments`,
      createDraftUrl: `${baseApiUrl}/noob-service/tournaments`,
      getByIdUrl: `${baseApiUrl}/noob-service/tournaments/{id}`,
      editUrl: `${baseApiUrl}/noob-service/tournaments/{id}`,
      openToPublicUrl: `${baseApiUrl}/noob-service/tournaments/{id}/open-to-public`
    },
    country: {
      searchUrl: `${baseApiUrl}/noob-service/countries`,
      searchStatesUrl: `${baseApiUrl}/noob-service/countries/{id}/states`
    },
  },
  supabase: {
    anonKey: supabaseAnonKey,
    apiUrl: supabaseUrl
  }
}


/**
 * @type {import('./utils/config/i-backend-config').IBackendConfig}
 **/
const backendConfig = {
  db: {
    databaseName: databaseName,
    dbHost: dbHost,
    dbPort: dbPort,
    dbUser: dbUser,
    dbPassword: dbPassword
  },
  supabase: {
    anonKey: supabaseAnonKey,
    apiUrl: supabaseUrl
  }
}


/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    frontendConfig
  },
  serverRuntimeConfig: {
    backendConfig
  },
  webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    })
    return config
  },
}
