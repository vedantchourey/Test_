import { IState } from '../../backend/services/database/models/i-state';
import { frontendSupabase } from '../services/supabase-frontend-service';

export const getAllStates = async (countryIsoCode: string): Promise<IState[]> => {
  const values = await frontendSupabase.from('states')
                                       .select(
                                         `id,
                                          countryId,
                                          isoCode, 
                                          displayName,
                                          countries!fk_states_countries_id 
                                          (
                                            id
                                          )`
                                       )
                                       .eq('countries.isoCode', countryIsoCode);
  return values.data as IState[];
}
