import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import ViewCard from "../../ui-components/view-card";
import Avatar from "@mui/material/Avatar";
import { TournamentData } from "../../tournament";
import { frontendSupabase } from "../../../services/supabase-frontend-service";
import { useRouter } from "next/router";
import GroupIcon from "@mui/icons-material/Group";
interface ParticipantsProps {
  data: TournamentData;
}



const Participants: React.FC<ParticipantsProps> = ({ data }) => {
  const router=useRouter();

  return (
    <React.Fragment>
      <ViewCard>
        {data?.playerList?.length ? (
          <Grid container rowSpacing={1}>
            {(data?.playerList || []).map((item: any) => {
              const avatarUrl = item.avatarUrl
                ? frontendSupabase.storage
                    .from("public-files")
                    .getPublicUrl(item.avatarUrl).publicURL as string
                : null;
              return (
                <Grid
                  key={item.id || item.team_id}
                  item
                  md={6}
                  xs={6}
                  border={"1px solid rgba(255, 255, 255, 0.1)"}
                >
                  <Box display="flex" alignItems="center" padding={2} 
                  onClick={():void=>{item.firstName?router.push(`/account/${item.username}`):null}}>
                    {item.team_name && !avatarUrl?
                    <GroupIcon style={{height:45,width:45,borderRadius:25,background: "rgba(0,0,0,0.4)"}}/>:
                    <Avatar
                      src={avatarUrl || undefined }
                      alt={item.firstName || item.team_name}
                    />}
                    <Typography marginLeft={"16px"}>
                      {item.firstName
                        ? `${item.firstName} ${item.lastName}`
                        : `${item.team_name}`}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
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
