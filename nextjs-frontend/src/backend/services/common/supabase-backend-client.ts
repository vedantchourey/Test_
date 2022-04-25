import { createClient } from '@supabase/supabase-js';
import backendConfig from '../../utils/config/backend-config';

const {apiUrl, anonKey, privateKey} = backendConfig.supabase;
export const backendSupabase = createClient(apiUrl, anonKey);
export const privateBackendSupabase = createClient(apiUrl, privateKey);

export const createAuthenticatedBackendSupabase = (jwt: string): any => {
  return createClient(apiUrl, anonKey, {
    headers: {
      apiKey: anonKey,
      Authorisation: `Bearer ${jwt}`
    }
  });
}
