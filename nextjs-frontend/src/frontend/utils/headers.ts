import { authSession } from '../service-clients/auth-service-client';

export async function getAuthHeader() {
  const session = await authSession();
  return {'Authorization': `Bearer ${session!.access_token}`};
}
