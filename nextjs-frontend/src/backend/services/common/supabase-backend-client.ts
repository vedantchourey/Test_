import { createClient } from '@supabase/supabase-js';
import backendConfig from '../../utils/config/backend-config';
import SupabaseClient from '@supabase/supabase-js/dist/main/SupabaseClient';

const {apiUrl, anonKey, privateKey} = backendConfig.supabase;
export const backendSupabase = createClient(apiUrl, anonKey);
export const privateBackendSupabase = createClient(apiUrl, privateKey);

export const createAuthenticatedBackendSupabase = (jwt: string): SupabaseClient => {
  return createClient(apiUrl, anonKey, {
    headers: {
      apiKey: anonKey,
      Authorisation: `Bearer ${jwt}`
    }
  });
}
