import { createClient } from '@supabase/supabase-js'
import { SignupRequest } from '../backend-services/auth-service/signup/signup';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.ZopqoUt20nEV9cklpv9e3yw3PVyZLmKs5qLD6nGL1SI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const signUp = async (request: SignupRequest) => {
  const {password, phone, email, provider, ...others} = request;
  await supabase.auth.signUp({
    password: password,
    phone: phone,
    email: email,
    provider: provider
  }, {
    data: others
  });
}
