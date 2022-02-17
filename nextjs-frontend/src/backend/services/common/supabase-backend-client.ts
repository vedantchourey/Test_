import { createClient } from '@supabase/supabase-js';
import backendConfig from '../../utils/config/backend-config';
import SupabaseClient from '@supabase/supabase-js/dist/main/SupabaseClient';

const {apiUrl, anonKey} = backendConfig.supabase;
export const backendSupabase = createClient(apiUrl, anonKey)

export const createAuthenticatedBackendSupabase = (jwt: string): SupabaseClient => {
  return createClient(apiUrl, anonKey, {
    headers: {
      apiKey: anonKey,
      Authorisation: `Bearer ${jwt}`
    }
  });
}
