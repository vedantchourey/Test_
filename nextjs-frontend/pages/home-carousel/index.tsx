import React from "react";
import { NoobUserRole } from "../../src/backend/utils/api-middle-ware/noob-user-role";
import AuthGuard from "../../src/frontend/components/auth/auth-guard";
import HomeCarouselPage from "../../src/frontend/components/home-carousel-page";
import NotFound from "../../src/frontend/components/not-found/not-found";

const requiredRoles: NoobUserRole[] = [];
const HomeCarouselCard: React.FC<void> = () => {
  return (
    <AuthGuard
      requiredRoles={requiredRoles}
      redirectToOnFailure="/"
      renderOnCheckFailure={(): JSX.Element => <NotFound />}
    >
    <HomeCarouselPage key={"homeCarouselPage"}></HomeCarouselPage>
    </AuthGuard>
  );
};

export default HomeCarouselCard;
