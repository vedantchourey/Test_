import React from "react";
import NoobPage from "../page/noob-page";
import CardComp from "../tournamentsUI/card";
import TournamentsCard from "../ui-components/tournamentsUI";

const Tournaments: React.FC = (): JSX.Element => {

  return (
    <NoobPage
      title="Tournaments"
      metaData={{
        description: "Noob Storm Tournaments page",
      }}
    >
      <TournamentsCard>
        <CardComp />
      </TournamentsCard>
    </NoobPage>
  );
};

export default Tournaments;
