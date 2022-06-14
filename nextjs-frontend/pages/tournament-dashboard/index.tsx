import router from "next/router";
import React, { useEffect } from "react";
import { NoobUserRole } from "../../src/backend/utils/api-middle-ware/noob-user-role";
import AuthGuard from "../../src/frontend/components/auth/auth-guard";
import NotFound from "../../src/frontend/components/not-found/not-found";
import TournamentDashboard from "../../src/frontend/components/tournament-dashboard";
import { isLoggedInSelector, userProfileSelector } from "../../src/frontend/redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../../src/frontend/redux-store/redux-store";

const requiredRoles: NoobUserRole[] = [];

const TournamentDashboardPage: React.FC<void> = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const user = useAppSelector(userProfileSelector);

  useEffect(() => {
    if (isLoggedIn) {
      if (user?.userRoles[0] !== "noob-admin") {
        router.push("/");
      }
    }
  }, [isLoggedIn, user]);
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
