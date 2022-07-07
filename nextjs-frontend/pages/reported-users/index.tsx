import React from "react";
import { NoobUserRole } from "../../src/backend/utils/api-middle-ware/noob-user-role";
import AuthGuard from "../../src/frontend/components/auth/auth-guard";
import ReportedUsers from "../../src/frontend/components/reported-users";
import NotFound from "../../src/frontend/components/not-found/not-found";

const requiredRoles: NoobUserRole[] = [];
const ReportedUsersCard: React.FC<void> = () => {
  return (
    <AuthGuard
      requiredRoles={requiredRoles}
      redirectToOnFailure="/"
      renderOnCheckFailure={(): JSX.Element => <NotFound />}
    >
    <ReportedUsers key={"reportedusers"}></ReportedUsers>
    </AuthGuard>
  );
};

export default ReportedUsersCard;
