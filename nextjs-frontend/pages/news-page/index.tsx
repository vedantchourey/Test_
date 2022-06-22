import React from "react";
import { NoobUserRole } from "../../src/backend/utils/api-middle-ware/noob-user-role";
import AuthGuard from "../../src/frontend/components/auth/auth-guard";
import NewsPage from "../../src/frontend/components/news-page";
import NotFound from "../../src/frontend/components/not-found/not-found";

const requiredRoles: NoobUserRole[] = [];
const NewsPageCard: React.FC<void> = () => {
  return (
    <AuthGuard
      requiredRoles={requiredRoles}
      redirectToOnFailure="/"
      renderOnCheckFailure={(): JSX.Element => <NotFound />}
    >
    <NewsPage key={"newspage"}></NewsPage>
    </AuthGuard>
  );
};

export default NewsPageCard;
