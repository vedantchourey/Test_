import React from "react";
import Tournaments from "../../src/frontend/components/tournaments-list";

const TournamentsPage: React.FC<void> = () => {
  return (
    <Tournaments key={"tournaments"}></Tournaments>
  );
};

export default TournamentsPage;
