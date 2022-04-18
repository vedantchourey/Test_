import React from "react";
import Tournament from "../../../src/frontend/components/tournament";

const TournamentPage: React.FC<void> = () => {
  return (
    <Tournament type={"new"} key={"tournament"}></Tournament>
  );
};

export default TournamentPage;
