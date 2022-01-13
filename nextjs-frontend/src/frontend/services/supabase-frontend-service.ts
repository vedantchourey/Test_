import { createClient } from '@supabase/supabase-js'
import frontEndConfig from '../utils/config/front-end-config';

const {apiUrl, anonKey} = frontEndConfig.supabase;

export const frontendSupabase = createClient(apiUrl, anonKey)

