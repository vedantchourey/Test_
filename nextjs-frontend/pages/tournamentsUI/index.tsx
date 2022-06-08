import React from "react";
import Tournaments from "../../src/frontend/components/tournamentsUI";

const TournamentsPage: React.FC<void> = () => {
  return (
    <Tournaments key={"tournaments"}></Tournaments>
  );
};

export default TournamentsPage;
