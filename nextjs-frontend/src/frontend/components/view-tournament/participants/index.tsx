import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import ViewCard from "../../ui-components/view-card";
import Avatar from "@mui/material/Avatar";
import { TournamentData } from "../../tournament";
interface ParticipantsProps {
  data: TournamentData;
}

const Participants: React.FC<ParticipantsProps> = ({ data }) => {  
  return (
    <React.Fragment>
      <ViewCard>
        {data?.playerList?.length ? (
          <Grid container rowSpacing={1}>
            {(data?.playerList || []).map((item: any) => (
              <Grid
                key={item.id || item.team_id}
                item
                md={6}
                border={"1px solid rgba(255, 255, 255, 0.1)"}
              >
                <Box display="flex" alignItems="center" padding={2}>
                  <Avatar alt={item.firstName || item.team_name} />
                  <Typography marginLeft={"16px"}>
                    {item.firstName ? `${item.firstName} ${item.lastName}` : `${item.team_name}`} 
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            No Participants
          </Box>
        )}
      </ViewCard>
    </React.Fragment>
  );
};

export default Participants;
