// @ts-check

const baseAppUrl = process.env.NOOB_BASE_APP_URL || 'http://localhost:19006';
const baseApiUrl = process.env.NOOB_BASE_API_URL || 'http://localhost:5000';

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
}


/**
 * @type {import('./utils/config/i-backend-config').IBackendConfig}
 **/
const backendConfig = {
  databaseName: process.env.NOOB_DATA_BASE_NAME || 'postgres',
  dbHost: process.env.NOOB_DATA_BASE_HOST || 'localhost',
  dbPort: process.env.NOOB_DATA_BASE_PORT || 54322,
  dbUser: process.env.NOOB_DATA_BASE_USER || 'postgres',
  dbPassword: process.env.NOOB_DATA_BASE_PASSWORD || 'postgres'
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
