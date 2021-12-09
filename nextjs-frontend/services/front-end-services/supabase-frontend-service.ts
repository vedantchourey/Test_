import { createClient } from '@supabase/supabase-js'
import frontEndConfig from '../../utils/config/front-end-config';
import { SignupRequest } from '../backend-services/auth-service/signup/signup-contracts';

const {apiUrl, anonKey} = frontEndConfig.supabase;

export const supabase = createClient(apiUrl, anonKey)

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
