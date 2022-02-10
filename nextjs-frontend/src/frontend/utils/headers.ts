import { authSession } from '../service-clients/auth-service-client';

export async function getAuthHeader(): Promise<{ [i: string]: string }> {
  const session = await authSession();
  if (session?.access_token == null) throw new Error('session was null');
  return {'Authorization': `Bearer ${session.access_token}`};
}
