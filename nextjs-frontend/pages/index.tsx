import type { NextPage } from "next";
import NoobPage from "../src/frontend/components/page/noob-page";
import NewHome from "../pages/home/index";
import { useAppSelector } from "../src/frontend/redux-store/redux-store";
import { userProfileSelector } from "../src/frontend/redux-store/authentication/authentication-selectors";
// import Heading from "../src/frontend/components/ui-components/typography/heading";

const Home: NextPage = () => {
  const user: any = useAppSelector(userProfileSelector);
  if(user?.suspended < new Date()){
    return (
      <NoobPage
        title="Home"
        metaData={{
          description: "Noob Storm home page",
        }}
      >
        <>
        {"susped"}
          {/* <Heading heading="Homepage" /> */}
          {/* <NewHome /> */}
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
          {/* <Heading heading="Homepage" /> */}
          {/* <NewHome /> */}
        </>
      </NoobPage>
    );
  }

    //   if(isBlocked.body[0]?.isBlocked){
    //   // throw 'account is blocked';
    //   return { isError: true, error: "account is blocked" }
    // }
    // if(isBlocked.body[0]?.suspended < new Date()){
    //   // throw "account is suspended"
    //   return { isError: true, error: "account is suspended" }
    // }
  return (
    <NoobPage
      title="Home"
      metaData={{
        description: "Noob Storm home page",
      }}
    >
      <>
        {/* <Heading heading="Homepage" /> */}
        <NewHome />
      </>
    </NoobPage>
  );
};

export default Home;
