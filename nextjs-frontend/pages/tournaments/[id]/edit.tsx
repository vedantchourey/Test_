import NoobPage from '../../../src/frontend/components/page/noob-page';
import AuthGuard from '../../../src/frontend/components/auth/auth-guard';
import EditTournamentForm from '../../../src/frontend/components/tournaments/edit-tournament-form';

export default function EditTournamentPage(): JSX.Element {


  return (
    <NoobPage title="Edit Tournament" metaData={{}}>
      <AuthGuard requiredRoles={['noob-admin']}>
        <EditTournamentForm />
      </AuthGuard>
    </NoobPage>
  )

}
