import type { NextPage } from "next";
import NoobPage from "../src/frontend/components/page/noob-page";
import Heading from "../src/frontend/components/ui-components/typography/heading";
import Tournament from "../src/frontend/components/tournament";

const Home: NextPage = () => {
  return (
    <NoobPage
      title="Home"
      metaData={{
        description: "Noob Storm home page",
      }}
    >
      <>
        <Heading heading="Homepage" />
        <Tournament/>
      </>
    </NoobPage>
  );
};

export default Home;
