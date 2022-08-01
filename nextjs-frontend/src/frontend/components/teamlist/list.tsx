import styled from "@emotion/styled";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { frontendSupabase } from "../../services/supabase-frontend-service";
import { getAuthHeader } from "../../utils/headers";

export const HeadCell = styled(TableCell)(() => ({
  borderTop: "1px solid #ffffff1a",
  borderBottom: "none",
}));

export const NoobCell = styled(TableCell)(() => ({
  border: "1px solid #ffffff1a",
  alignItems: "center",
}));

export const NoobRow = styled(TableRow)(() => ({
  align: "center",
}));

export interface Player {
  balance: number;
  firstName: string;
  lastName: string;
  user_id: string;
}

export interface TeamData {
  id: string;
  name: string;
  players: Player[];
  teamLogo: string;
  teamCover: string;
  won: string;
  loss: string;
  elo_rating: string;
  team_elo_rating: string;
}

const TeamListData: React.FC = () => {
  const [teamdata, setData] = React.useState<TeamData[]>([]);
  const router = useRouter();
  const teamList = async (): Promise<void> => {
    try {
      const endpoint = "api/teams";
      const headers = await getAuthHeader();
      axios.get(endpoint, { headers: headers }).then((res) => {
        setData(res.data.result);
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleNavigation = async (id: string): Promise<void> => {
    router.push(`/team/view/${id}/members`);
  };

  React.useEffect(() => {
    teamList();
  }, []);

  return (
    <React.Fragment>
      <Grid container rowSpacing={2} mt={4}>
        <Grid item xs={12} sm={12} md={12} mb={12}>
          {teamdata.map((item) => {
            const teamLogo = item.teamLogo
              ? frontendSupabase.storage
                  .from("public-files")
                  .getPublicUrl(item.teamLogo).publicURL
              : "/icons/Rectangle.svg";
            return (
              <Box mt={2} onClick={(): void => {
                handleNavigation(item.id);
              }}
              style={{ cursor: "pointer" }}>
                <Card style={{ width: "100%" }}>
                  <Box p={1} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"} flex={0.4}>
                      <img
                        src={teamLogo || ""}
                        width={"45px"}
                        height={"45px"}
                        style={{ borderRadius: 65 }}
                      />
                      <Typography marginLeft={2} marginRight={2}>
                        {item.name}
                      </Typography>
                    </Box>
                    <Box
                      mr={2}
                      textAlign={"left"}
                      width={100}
                      display={"flex"}
                      justifyContent={"left"}
                    >
                      <AvatarGroup>
                        {item.players.slice(0, 3).map((p: any) => {
                          const image = p.avatarUrl
                            ? frontendSupabase.storage
                                .from("public-files")
                                .getPublicUrl(p.avatarUrl).publicURL
                            : undefined;
                          return (
                            <Avatar
                              alt={p.firstName}
                              src={image || undefined}
                              key={p.firstName}
                            >
                              {p.firstName[0]}
                            </Avatar>
                          );
                        })}
                        {item.players.length > 3 && (
                          <Avatar>+{item.players.length - 3}</Avatar>
                        )}
                      </AvatarGroup>
                    </Box>
                    <Box ml={4}>
                      <Typography>GAME</Typography>
                      <Typography color={"rgba(255,255,255,0.4)"} textAlign={"center"}>
                        {parseInt(item.won) + parseInt(item.loss)}
                      </Typography>
                    </Box>
                    <Box ml={4}>
                      <Typography>WON</Typography>
                      <Typography color={"rgba(255,255,255,0.4)"} textAlign={"center"}>
                        {parseInt(item.won)}
                      </Typography>
                    </Box>
                    <Box ml={4} mr={2}>
                      <Typography>ELO</Typography>
                      <Typography  color={"rgba(255,255,255,0.4)"} textAlign={"center"} >
                        {parseInt(item.team_elo_rating)}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default TeamListData;
