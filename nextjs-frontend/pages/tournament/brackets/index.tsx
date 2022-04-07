import { Button } from "@mui/material";
import React from "react";
import Tournament, {
  TournamentData,
} from "../../../src/frontend/components/tournament";
import NavTabs from "../../../src/frontend/components/ui-components/navtabs";
import Create from "../../../src/frontend/components/brackets/create";
import NoobPage from "../../../src/frontend/components/page/noob-page";

export interface BracketProps {
  onSubmit?: (data: TournamentData) => void;
}

const Brackets: React.FC<BracketProps> = ({ onSubmit }): JSX.Element => {
  const tabs = ["Create"];
  const [current, setCurrent] = React.useState(0);

  const renderComponent = (newCurrent: number): JSX.Element | null => {
    switch (newCurrent) {
      case 0:
        return <Create />;
      default:
        return null;
    }
  };

  const action = <Button variant="contained">Preview</Button>;
  return (
    <NoobPage
      title="brackets"
      metaData={{
        description: "Noob Storm brackets page",
      }}
    >
      <Tournament>
        <NavTabs
          items={tabs}
          action={action}
          current={current}
          onClick={setCurrent}
        ></NavTabs>
        {renderComponent(current)}
      </Tournament>
    </NoobPage>
  );
};

export default Brackets;
