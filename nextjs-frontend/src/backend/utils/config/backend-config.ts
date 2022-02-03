import { IBackendConfig } from './i-backend-config';

const databaseName = process.env.NOOB_DATA_BASE_NAME || 'postgres';
const dbHost = process.env.NOOB_DATA_BASE_HOST || 'localhost';
const dbPort = process.env.NOOB_DATA_BASE_PORT || '54322';
const dbUser = process.env.NOOB_DATA_BASE_USER || 'postgres';
const dbPassword = process.env.NOOB_DATA_BASE_PASSWORD || 'postgres';
const supabaseUrl = process.env.NEXT_PUBLIC_NOOB_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = process.env.NEXT_PUBLIC_NOOB_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.ZopqoUt20nEV9cklpv9e3yw3PVyZLmKs5qLD6nGL1SI';
const {
  CMS_API_ENDPOINT,
  CMS_API_TOKEN
} = process.env;

const appUrl = process.env.NEXT_PUBLIC_NOOB_BASE_APP_URL || 'http://localhost:3000';

export const backendConfig: IBackendConfig = {
  db: {
    databaseName: databaseName,
    dbHost: dbHost,
    dbPort: parseInt(dbPort),
    dbUser: dbUser,
    dbPassword: dbPassword,
    ssl: {
      rejectUnauthorized: false,
      ca: "-----BEGIN CERTIFICATE-----\nMIIDxDCCAqygAwIBAgIUbLxMod62P2ktCiAkxnKJwtE9VPYwDQYJKoZIhvcNAQEL\nBQAwazELMAkGA1UEBhMCVVMxEDAOBgNVBAgMB0RlbHdhcmUxEzARBgNVBAcMCk5l\ndyBDYXN0bGUxFTATBgNVBAoMDFN1cGFiYXNlIEluYzEeMBwGA1UEAwwVU3VwYWJh\nc2UgUm9vdCAyMDIxIENBMB4XDTIxMDQyODEwNTY1M1oXDTMxMDQyNjEwNTY1M1ow\nazELMAkGA1UEBhMCVVMxEDAOBgNVBAgMB0RlbHdhcmUxEzARBgNVBAcMCk5ldyBD\nYXN0bGUxFTATBgNVBAoMDFN1cGFiYXNlIEluYzEeMBwGA1UEAwwVU3VwYWJhc2Ug\nUm9vdCAyMDIxIENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqQXW\nQyHOB+qR2GJobCq/CBmQ40G0oDmCC3mzVnn8sv4XNeWtE5XcEL0uVih7Jo4Dkx1Q\nDmGHBH1zDfgs2qXiLb6xpw/CKQPypZW1JssOTMIfQppNQ87K75Ya0p25Y3ePS2t2\nGtvHxNjUV6kjOZjEn2yWEcBdpOVCUYBVFBNMB4YBHkNRDa/+S4uywAoaTWnCJLUi\ncvTlHmMw6xSQQn1UfRQHk50DMCEJ7Cy1RxrZJrkXXRP3LqQL2ijJ6F4yMfh+Gyb4\nO4XajoVj/+R4GwywKYrrS8PrSNtwxr5StlQO8zIQUSMiq26wM8mgELFlS/32Uclt\nNaQ1xBRizkzpZct9DwIDAQABo2AwXjALBgNVHQ8EBAMCAQYwHQYDVR0OBBYEFKjX\nuXY32CztkhImng4yJNUtaUYsMB8GA1UdIwQYMBaAFKjXuXY32CztkhImng4yJNUt\naUYsMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAB8spzNn+4VU\ntVxbdMaX+39Z50sc7uATmus16jmmHjhIHz+l/9GlJ5KqAMOx26mPZgfzG7oneL2b\nVW+WgYUkTT3XEPFWnTp2RJwQao8/tYPXWEJDc0WVQHrpmnWOFKU/d3MqBgBm5y+6\njB81TU/RG2rVerPDWP+1MMcNNy0491CTL5XQZ7JfDJJ9CCmXSdtTl4uUQnSuv/Qx\nCea13BX2ZgJc7Au30vihLhub52De4P/4gonKsNHYdbWjg7OWKwNv/zitGDVDB9Y2\nCMTyZKG3XEu5Ghl1LEnI3QmEKsqaCLv12BnVjbkSeZsMnevJPs1Ye6TjjJwdik5P\no/bKiIz+Fq8=\n-----END CERTIFICATE-----\n"
    }
  },
  supabase: {
    anonKey: supabaseAnonKey,
    apiUrl: supabaseUrl
  },
  client: {
    cmsApiEndpoint: CMS_API_ENDPOINT || 'API_ENDPOINT',
    cmsApiToken: CMS_API_TOKEN || 'API_TOKEN',
    appUrl: appUrl
  }
}

export default backendConfig;
