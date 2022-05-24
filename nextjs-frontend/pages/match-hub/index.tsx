import { NextPage } from "next";

// components
import NoobPage from "../../src/frontend/components/page/noob-page";
import MatchHub, { Match } from "../../src/frontend/components/match-hub";
import MatchHubTeams from "../../src/frontend/components/match-hub/match-hub-teams";
import React from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { getAuthHeader } from "../../src/frontend/utils/headers";


const MatchHubPage: NextPage = () => {
  const [match, setMatch] = React.useState<Match | undefined>();
  const [data, setData] = React.useState<Match[]>([]);

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
        {!match ? <MatchHub data={data} onMatchHub={setMatch} /> : <MatchHubTeams match={match} onBack={():void=>setMatch(undefined)}/>}
      </Box>
    </NoobPage>
  );
}; 

export default MatchHubPage;
