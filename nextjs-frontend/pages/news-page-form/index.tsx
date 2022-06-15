import React from "react";
import { NoobUserRole } from "../../src/backend/utils/api-middle-ware/noob-user-role";
import AuthGuard from "../../src/frontend/components/auth/auth-guard";
import NewsPageForm from "../../src/frontend/components/news-page-form";
import NotFound from "../../src/frontend/components/not-found/not-found";

const requiredRoles: NoobUserRole[] = [];
const NewsPageFormCard: React.FC<void> = () => {
  return (
    <AuthGuard
      requiredRoles={requiredRoles}
      redirectToOnFailure="/"
      renderOnCheckFailure={(): JSX.Element => <NotFound />}
    >
    <NewsPageForm key={"newspage-form"}></NewsPageForm>
    </AuthGuard>
  );
};

export default NewsPageFormCard;
