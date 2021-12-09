import { StateResponse } from './state-response';
import { supabase } from '../../services/supabase-service';

export const getAllStates = async (countryId: number): Promise<StateResponse[]> => {
  const values = await supabase.from('states').select('id, isoCode, displayName, countryId').eq('countryId', countryId);
  return values.data as StateResponse[];
}
