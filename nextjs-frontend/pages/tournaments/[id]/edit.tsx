import { useRouter } from 'next/router';
import { NoobPage } from '../../../src/frontend/components/page/noob-page';
import AuthGuard from '../../../src/frontend/components/auth/auth-guard';
import EditTournamentForm from '../../../src/frontend/components/tournaments/edit-tournament-form';

export default function EditTournamentPage() {
  const router = useRouter();
  const id = router.query['id'];


  return (
    <NoobPage title="Edit Tournament" metaData={{}}>
      <AuthGuard requiredRoles={['noob-admin']}>
        <EditTournamentForm id={id as string}/>
      </AuthGuard>
    </NoobPage>
  )

}
