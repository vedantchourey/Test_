export interface IBackendConfig {
  db: {
    dbHost: string;
    dbPort: number;
    dbUser: string;
    dbPassword: string;
    databaseName: string;
  };
  supabase: {
    apiUrl: string;
    anonKey: string;
  };
}
