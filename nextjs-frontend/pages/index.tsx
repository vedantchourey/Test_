import type { NextPage } from "next";
import router from "next/router";
import { useEffect } from "react";
import NoobPage from "../src/frontend/components/page/noob-page";
import Heading from "../src/frontend/components/ui-components/typography/heading";
import { isLoggedInSelector } from "../src/frontend/redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../src/frontend/redux-store/redux-store";

const Home: NextPage = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);

  useEffect(() => {
    if (isLoggedIn) router.push("tournament-dashboard");
  }, [isLoggedIn]);
  return (
    <NoobPage
      title="Home"
      metaData={{
        description: "Noob Storm home page",
      }}
    >
      <>
        <Heading heading="Homepage" />
      </>
    </NoobPage>
  );
};

export default Home;
