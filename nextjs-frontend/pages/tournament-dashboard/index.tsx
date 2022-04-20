import React from "react";
import { NoobUserRole } from "../../src/backend/utils/api-middle-ware/noob-user-role";
import AuthGuard from "../../src/frontend/components/auth/auth-guard";
import NotFound from "../../src/frontend/components/not-found/not-found";
import TournamentDashboard from "../../src/frontend/components/tournament-dashboard";

const requiredRoles: NoobUserRole[] = [];

const TournamentDashboardPage: React.FC<void> = () => {
  return (
    <AuthGuard
      requiredRoles={requiredRoles}
      redirectToOnFailure="/"
      renderOnCheckFailure={(): JSX.Element => <NotFound />}
    >
      <TournamentDashboard key={"tournament"}></TournamentDashboard>
    </AuthGuard>
  );
};

export default TournamentDashboardPage;
