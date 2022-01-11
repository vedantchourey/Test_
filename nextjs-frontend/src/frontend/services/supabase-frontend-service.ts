import { createClient } from '@supabase/supabase-js'
import frontEndConfig from '../utils/config/front-end-config';
import { SignupRequest } from '../../backend/services/auth-service/signup/signup-contracts';

const {apiUrl, anonKey} = frontEndConfig.supabase;

export const frontendSupabase = createClient(apiUrl, anonKey)

