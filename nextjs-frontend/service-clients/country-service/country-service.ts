import { frontendSupabase } from '../../services/front-end-services/supabase-frontend-service';
import { IState } from '../../services/backend-services/database/repositories/state-repository';

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
