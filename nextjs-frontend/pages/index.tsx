import type { NextPage } from "next";
import NoobPage from "../src/frontend/components/page/noob-page";
import NewHome from "../pages/home/index";
import { useAppSelector } from "../src/frontend/redux-store/redux-store";
import { userProfileSelector } from "../src/frontend/redux-store/authentication/authentication-selectors";
// import Heading from "../src/frontend/components/ui-components/typography/heading";

const Home: NextPage = () => {
  const user: any = useAppSelector(userProfileSelector);
  if(user?.suspended && user?.suspended < new Date()){
    return (
      <NoobPage
        title="Home"
        metaData={{
          description: "Noob Storm home page",
        }}
      >
        <>
        {"susped"}
        </>
      </NoobPage>
    );
  }
  if(user?.isBlocked) {
    return (
      <NoobPage
        title="Home"
        metaData={{
          description: "Noob Storm home page",
        }}
      >
        <>
        blocked
        </>
      </NoobPage>
    );
  }
  return (
    <NoobPage
      title="Home"
      metaData={{
        description: "Noob Storm home page",
      }}
    >
      <>
        <NewHome />
      </>
    </NoobPage>
  );
};

export default Home;
