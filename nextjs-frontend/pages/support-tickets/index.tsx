import React from "react";
import { NoobUserRole } from "../../src/backend/utils/api-middle-ware/noob-user-role";
import AuthGuard from "../../src/frontend/components/auth/auth-guard";
import SupportList from "../../src/frontend/components/support-tickets";
import NotFound from "../../src/frontend/components/not-found/not-found";

const requiredRoles: NoobUserRole[] = [];
const SupportTiketList: React.FC<void> = () => {
  return (
    <AuthGuard
      requiredRoles={requiredRoles}
      redirectToOnFailure="/"
      renderOnCheckFailure={(): JSX.Element => <NotFound />}
    >
    <SupportList key={"supportlist"}></SupportList>
    </AuthGuard>
  );
};

export default SupportTiketList;
