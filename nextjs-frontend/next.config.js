// @ts-check

const baseAppUrl = process.env.NOOB_BASE_APP_URL || 'http://localhost:19006';
const baseApiUrl = process.env.NOOB_BASE_API_URL || 'http://localhost:5000';
const cognitoUserPoolId = process.env.NOOB_COGNITO_USER_POOL || 'ap-south-1_zrZFYDMXd';
const cognitoAppClientId = process.env.NOOB_COGNITO_APP_CLIENT_ID || '3ov60p2vm8ivvi99dhr7mq8vp8';
const cognitoDomain = process.env.NOOB_COGNITO_DOMAIN || 'https://test-nooby.auth.ap-south-1.amazoncognito.com';
const imageBasePath = process.env.NOOB_ASSETS_BASE || 'http://localhost:8080/';

/**
 * @type {import('./utils/IFrontendConfig.ts').IFrontendConfig}
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
  aws: {
    region: 'ap-south-1',
    cognito: {
      userPoolId: cognitoUserPoolId,
      appClientId: cognitoAppClientId,
      region: 'ap-south-1',
      hostedUiDomain: cognitoDomain,
      redirectSignOutUrl: `${baseAppUrl}/auth-logout-redirect-callback`,
      redirectSignInUrl: `${baseAppUrl}/auth-redirect-callback`,
      isAdvancedSecurityDataCollectionRequired: false,
      responseType: 'code',
      scope: ['phone', 'email', 'profile', 'openid'],
    }
  },
  assets: {
    imageBasePath: imageBasePath
  }
}

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    frontendConfig
  }
}
