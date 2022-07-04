import { NextPage } from "next";

// components
import NoobPage from "../../src/frontend/components/page/noob-page";
import MatchHub, { Match } from "../../src/frontend/components/match-hub";
import MatchHubTeams from "../../src/frontend/components/match-hub/match-hub-teams";
import React from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { getAuthHeader } from "../../src/frontend/utils/headers";
import { TournamentData } from "../../src/frontend/components/tournament";
import Chat from "../../src/frontend/components/chat";

export interface IMatchHubData extends Match {
  tournament: TournamentData | any
}

const MatchHubPage: NextPage = () => {
  const [match, setMatch] = React.useState<IMatchHubData | undefined>();
  const [data, setData] = React.useState<IMatchHubData[]>([]);

  const fetchData = async ():Promise<void> =>{
    const headers = await getAuthHeader();
    axios.get("/api/tournaments/user-matchs",{headers:headers}).then((res)=>{
      setData(res.data);
    })
.catch((err)=>{
      console.error(err);
    })
  }

  React.useEffect(()=>{
    fetchData();
  },[])
  return (
    <NoobPage
      title="Match hub"
      metaData={{
        description: "Match hub",
      }}
    >
      <Box sx={{ margin: { xs: "0px", sm: "0px", md: "56px 70px 0px 70px" } }}>
        {!match ? (
          <MatchHub data={data} onMatchHub={setMatch} />
        ) : (
          <MatchHubTeams
            match={match}
            onBack={(): void => setMatch(undefined)}
          />
        )}
        <Box p={3}>
          <Chat smallChat={false} social={false} />
        </Box>
      </Box>
    </NoobPage>
  );
}; 

export default MatchHubPage;
