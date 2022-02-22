import { frontendSupabase } from '../services/supabase-frontend-service';
import { ISearchPeopleByUsername } from './messages/i-search';

const searchPeopleByUsername = async (username: string): Promise<ISearchPeopleByUsername[]> => {
  const result = await frontendSupabase.from('profiles').select('id, avatarUrl, firstName, lastName, username')
    .textSearch('username', username);
  if (result.error) throw result.error;
  return result.data;
}

export {
  searchPeopleByUsername
}