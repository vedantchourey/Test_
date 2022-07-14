import React from "react";
import { NoobUserRole } from "../../src/backend/utils/api-middle-ware/noob-user-role";
import AuthGuard from "../../src/frontend/components/auth/auth-guard";
import ReportedPost from "../../src/frontend/components/reported-post";
import NotFound from "../../src/frontend/components/not-found/not-found";

const requiredRoles: NoobUserRole[] = [];
const ReportedPostCard: React.FC<void> = () => {
  return (
    <AuthGuard
      requiredRoles={requiredRoles}
      redirectToOnFailure="/"
      renderOnCheckFailure={(): JSX.Element => <NotFound />}
    >
    <ReportedPost key={"reportedpost"}></ReportedPost>
    </AuthGuard>
  );
};

export default ReportedPostCard;
