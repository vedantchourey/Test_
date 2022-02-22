export type DbSslConfig = {
  rejectUnauthorized: false;
  ca: string;
};

export interface IBackendConfig {
  db: {
    dbHost: string;
    dbPort: number;
    dbUser: string;
    dbPassword: string;
    databaseName: string;
    ssl: DbSslConfig
  };
  supabase: {
    apiUrl: string;
    anonKey: string;
    privateKey: string;
  };
  client: {
    cmsApiToken: string;
    cmsApiEndpoint: string;
    appUrl: string;
  }
}
