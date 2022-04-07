import { Button } from "@mui/material";
import React from "react";
import {  TournamentData } from "../tournament";
import NavTabs from "../ui-components/navtabs";
import Create from "./create";


export interface BracketProps{
  onSubmit? : (data: TournamentData) => void
}

const Brackets:React.FC<BracketProps> = ({onSubmit}): JSX.Element => {
  const tabs = ["Create"];
  const [current, setCurrent] = React.useState(0);
  

  const renderComponent = (newCurrent: number): JSX.Element | null => {
    switch (newCurrent) {
    case 0:
      return <Create/>;
    default:
      return null;
    }
  };

  const action = <Button variant="contained">Preview</Button>;
  return (
    <React.Fragment>
      <NavTabs
        items={tabs}
        action={action}
        current={current}
        onClick={setCurrent}
      ></NavTabs>
      {renderComponent(current)}
    </React.Fragment>
  );
};

export default Brackets;
