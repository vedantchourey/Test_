import React from "react";
import { NoobUserRole } from "../../src/backend/utils/api-middle-ware/noob-user-role";
import AuthGuard from "../../src/frontend/components/auth/auth-guard";
import NotFound from "../../src/frontend/components/not-found/not-found";
import TournamentMaster from "../../src/frontend/components/tournament-master";

const requiredRoles: NoobUserRole[] = [];
const TournamentMasterPage: React.FC<void> = () => {
  return (
    <AuthGuard
      requiredRoles={requiredRoles}
      redirectToOnFailure="/"
      renderOnCheckFailure={(): JSX.Element => <NotFound />}
    >
    <TournamentMaster key={"tournament"}></TournamentMaster>
    </AuthGuard>
  );
};

export default TournamentMasterPage;
