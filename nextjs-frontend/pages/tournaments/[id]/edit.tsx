import { useRouter } from 'next/router';
import { NoobPage } from '../../../src/frontend/components/page/noob-page';
import AuthGuard from '../../../src/frontend/components/auth/auth-guard';
import { Typography } from '@mui/material';

export function EditTournamentPage() {
  const router = useRouter();
  const id = router.query['id'];

  return (
    <NoobPage title="Edit Tournament" metaData={{}}>
      <AuthGuard requiredRoles={['noob-admin']}>
        <Typography> the url param is {id}</Typography>
      </AuthGuard>
    </NoobPage>
  )

}
