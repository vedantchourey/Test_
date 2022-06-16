import type { NextPage } from "next";
import router from "next/router";
import { useEffect } from "react";
import NoobPage from "../src/frontend/components/page/noob-page";
import NewHome from "../pages/home/index";
import Heading from "../src/frontend/components/ui-components/typography/heading";
import {
  isLoggedInSelector,
  userProfileSelector,
} from "../src/frontend/redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../src/frontend/redux-store/redux-store";
import UserDashboard from '../src/frontend/components/user-dashboard'

const Home: NextPage = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const user = useAppSelector(userProfileSelector);

  useEffect(() => {
    if (isLoggedIn) {
      if (user?.userRoles[0] === "noob-admin") {
        router.push("tournament-dashboard");
      }
    }
  }, [isLoggedIn, user]);
  return (
    <NoobPage
      title="Home"
      metaData={{
        description: "Noob Storm home page",
      }}
    >
      <>
        
        <Heading heading="Homepage" />
        {/* {isLoggedIn && <UserDashboard />} */}
        {isLoggedIn && <NewHome />}
      </>
    </NoobPage>
  );
};

export default Home;
