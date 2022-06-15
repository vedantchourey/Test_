import { Container } from "@mui/material";
import React, { Fragment } from "react";
import NoobPage from "../page/noob-page";
import TournamentsCard from "../ui-components/tournamentsUI";
import SliderComp from "./sliderimage";

const Tournaments: React.FC = (): JSX.Element => {

  return (
    <NoobPage
      title="Tournaments"
      metaData={{
        description: "Noob Storm Tournaments page",
      }}
    >
      <Fragment>
        <Container maxWidth="xl">
          <TournamentsCard>
            <SliderComp />
          </TournamentsCard>
        </Container>
      </Fragment>
    </NoobPage >
  );
};

export default Tournaments;
