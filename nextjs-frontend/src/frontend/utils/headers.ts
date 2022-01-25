import { authSession } from '../service-clients/auth-service-client';

export async function getAuthHeader() {
  const session = await authSession();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return {'Authorization': `Bearer ${session!.access_token}`};
}
