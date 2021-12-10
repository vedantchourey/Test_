import { StateResponse } from './state-response';
import { frontendSupabase } from '../../services/front-end-services/supabase-frontend-service';

export const getAllStates = async (countryId: number): Promise<StateResponse[]> => {
  const values = await frontendSupabase.from('states').select('id, isoCode, displayName, countryId').eq('countryId', countryId);
  return values.data as StateResponse[];
}
