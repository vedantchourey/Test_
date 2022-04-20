import React from "react";
import { NoobUserRole } from "../../../../src/backend/utils/api-middle-ware/noob-user-role";
import AuthGuard from "../../../../src/frontend/components/auth/auth-guard";
import NotFound from "../../../../src/frontend/components/not-found/not-found";
import Tournament from "../../../../src/frontend/components/tournament";

const requiredRoles: NoobUserRole[] = ["admin"];

const TournamentPage: React.FC<void> = () => {
  return (
    <AuthGuard
      requiredRoles={requiredRoles}
      redirectToOnFailure="/"
      renderOnCheckFailure={(): JSX.Element => <NotFound />}
    >
      <Tournament type={"update"} key={"tournament"}></Tournament>
    </AuthGuard>
  );
};

export default TournamentPage;
