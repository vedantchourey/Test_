import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import ViewCard from "../../ui-components/view-card";
import Avatar from "@mui/material/Avatar";
import { TournamentData } from "../../tournament";
import { frontendSupabase } from "../../../services/supabase-frontend-service";
import { useRouter } from "next/router";
import GroupIcon from "@mui/icons-material/Group";
import { isDeviceTypeSelector } from "../../../../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from "../../../../../src/frontend/redux-store/layout/device-types";
import { useAppSelector } from "../../../redux-store/redux-store";
interface ParticipantsProps {
  data: TournamentData;
}

const Participants: React.FC<ParticipantsProps> = ({ data }) => {
  const router = useRouter();

  const isDesktop = useAppSelector((x) =>
    isDeviceTypeSelector(x, deviceTypes.desktop));

  return (
    <React.Fragment>
      <ViewCard>
        {data?.playerList?.length ? (
          <Grid container rowSpacing={1}>
            {(data?.playerList || []).map((item: any) => {
              const avatarUrl = item.avatarUrl
                ? (frontendSupabase.storage
                    .from("public-files")
                    .getPublicUrl(item.avatarUrl).publicURL as string)
                : null;
              return (
                <Grid
                  key={item.id || item.team_id}
                  item
                  md={6}
                  xs={6}
                  border={"1px solid rgba(255, 255, 255, 0.1)"}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    padding={2}
                    onClick={(): void => {
                      item.username
                        ? router.push(`/account/${item.username}`)
                        : router.push(`/team/view/${item.team_id}/members`);
                    }}
                    style={{cursor: "pointer"}}
                  >
                    {item.team_name && !avatarUrl ? (
                      <GroupIcon
                        style={{
                          height: !isDesktop ? 30 : 45,
                          width: !isDesktop ? 30 : 45,
                          borderRadius: 25,
                          background: "rgba(0,0,0,0.4)",
                        }}
                      />
                    ) : (
                      <Avatar
                        src={avatarUrl || undefined}
                        alt={item.firstName || item.team_name}
                        style={{
                          height: !isDesktop ? 30 : 45,
                          width: !isDesktop ? 30 : 45,
                        }}
                      />
                    )}
                    <Box sx={!isDesktop ? { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", marginLeft: "5px" } : { display: "flex", flexDirection: "row", marginLeft: "16px" }}>
                      <Typography style={{ fontSize: !isDesktop ? 10 : 15 }}>
                        {item.firstName
                          ? `${item.username}`
                          : `${item.team_name}`}
                      </Typography>
                      <Typography color="rgba(255,255,255,0.5)" style={{ fontSize: !isDesktop ? 10 : 15, marginLeft: isDesktop ? "5px" : "0px" }}>
                        {item.gameUniqueId
                          ? `(${item.gameUniqueId})`
                          : ``}
                      </Typography>
                    </Box>
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
