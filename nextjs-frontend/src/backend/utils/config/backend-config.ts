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

export const backendConfig: IBackendConfig = {
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
  },
  client: {
    cmsApiEndpoint: CMS_API_ENDPOINT!,
    cmsApiToken: CMS_API_TOKEN!
  }
}

export default backendConfig;
