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
  credit_config: {
    credit_gst_percentage: number;
    credit_service_percentage: number;
    price_per_credit: number
  },
  sandbox: {
    api_key: string,
    secret: string
  }
}
