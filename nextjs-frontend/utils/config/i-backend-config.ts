export interface IBackendConfig {
  db: {
    dbHost: string;
    dbPort: string;
    dbUser: string;
    dbPassword: string;
    databaseName: string;
  };
  supabase: {
    apiUrl: string;
    anonKey: string;
  };
}
