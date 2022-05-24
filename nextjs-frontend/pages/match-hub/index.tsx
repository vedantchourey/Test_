import { NextPage } from "next";

// components
import NoobPage from "../../src/frontend/components/page/noob-page";
import MatchHub from "../../src/frontend/components/match-hub";
import MatchHubTeams from "../../src/frontend/components/match-hub/match-hub-teams";
import React from "react";
import { Box } from "@mui/material";


const MatchHubPage: NextPage = () => {
  const [opponent] = React.useState(123);
  return (
    <NoobPage
      title="Match hub"
      metaData={{
        description: "Match hub",
      }}
    >
      <Box sx={{ margin: { xs: "0px", sm: "0px", md: "56px 70px 0px 70px" } }}>
        {!opponent ? <MatchHub /> : <MatchHubTeams />}
      </Box>
    </NoobPage>
  );
}; 

export default MatchHubPage;
