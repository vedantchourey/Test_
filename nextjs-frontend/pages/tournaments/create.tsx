import AuthGuard from '../../src/frontend/components/auth/auth-guard';
import { NoobUserRole } from '../../src/backend/utils/api-middle-ware/noob-user-role';
import NotFound from '../../src/frontend/components/not-found/not-found';
import { NoobPage } from '../../src/frontend/components/page/noob-page';
import CreateTournamentForm from '../../src/frontend/components/tournaments/create-tournament-form';
import { useRouter } from 'next/router';

const requiredRoles: NoobUserRole[] = ['noob-admin'];

export default function Create() {

  const router = useRouter();

  async function onTournamentCreated(id: string) {
    await router.push(`/tournaments/${id}/edit`);
  }

  return (
    <NoobPage title="Create Tournament" metaData={{description: "Noob storm home page"}}>
      <AuthGuard requiredRoles={requiredRoles} renderOnCheckFailure={() => <NotFound/>}>
        <CreateTournamentForm onCreated={onTournamentCreated}/>
      </AuthGuard>
    </NoobPage>
  )

}
