import { createClient } from '@supabase/supabase-js';
import backendConfig from '../../../utils/config/backend-config';

const {apiUrl, anonKey} = backendConfig.supabase;
export const supabase = createClient(apiUrl, anonKey)
