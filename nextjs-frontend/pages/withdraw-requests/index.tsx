import React from "react";
import { NoobUserRole } from "../../src/backend/utils/api-middle-ware/noob-user-role";
import AuthGuard from "../../src/frontend/components/auth/auth-guard";
import NotFound from "../../src/frontend/components/not-found/not-found";
import WithdrawRequest from "../../src/frontend/components/withdraw-request";

const requiredRoles: NoobUserRole[] = [];
const NewsPageCard: React.FC<void> = () => {
  return (
    <AuthGuard
      requiredRoles={requiredRoles}
      redirectToOnFailure="/"
      renderOnCheckFailure={(): JSX.Element => <NotFound />}
    >
      <WithdrawRequest key={"newspage"}></WithdrawRequest>
    </AuthGuard>
  );
};

export default NewsPageCard;
