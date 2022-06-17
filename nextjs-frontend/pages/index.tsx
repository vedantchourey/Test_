import type { NextPage } from "next";
import NoobPage from "../src/frontend/components/page/noob-page";
import NewHome from "../pages/home/index";
import Heading from "../src/frontend/components/ui-components/typography/heading";
import { isLoggedInSelector } from "../src/frontend/redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../src/frontend/redux-store/redux-store";

const Home: NextPage = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);

  return (
    <NoobPage
      title="Home"
      metaData={{
        description: "Noob Storm home page",
      }}
    >
      <>
        <Heading heading="Homepage" />
        {isLoggedIn && <NewHome />}
      </>
    </NoobPage>
  );
};

export default Home;
