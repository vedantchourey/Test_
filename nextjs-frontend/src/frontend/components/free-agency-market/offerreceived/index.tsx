import styled from "@emotion/styled";
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getAuthHeader } from "../../../utils/headers";
import { useAppSelector } from "../../../redux-store/redux-store";
import { allGamesSelector } from "../../../redux-store/games/game-selectors";
import { useAppDispatch } from "../../../redux-store/redux-store";
import { fetchAllGamesThunk } from "../../../redux-store/games/game-slice";
import { gamesFetchStatusSelector } from "../../../redux-store/games/game-selectors";
import { frontendSupabase } from "../../../services/supabase-frontend-service";
import Image from "next/image";
import GroupIcon from "@mui/icons-material/Group";

export const NoobCell = styled(TableCell)(() => ({
  border: "0px",
}));

export const NoobRow = styled(TableRow)(() => ({
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  // "& td:nth-child(1)":{
  //     borderRight:"1px solid #6932F9"
  // }
}));

interface IData {
  username: string;
  teamname: string[];
  date: string;
  invite_key: string;
  teamId: string;
  gameId: string;
  message: string;
}

export const NoobButton = styled(Button)(() => ({
  color: "white",
  borderRadius: 0,
  textTransform: "capitalize",
  "&.delete": {
    background: "rgba(255, 0, 0, 0.2)",
  },
  "&.leave": {
    background: "rgba(196, 213, 2, 0.2)",
  },
}));

const Permissions: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IData[] | []>([]);

  const appDispatch = useAppDispatch();
  const games = useAppSelector(allGamesSelector);
  const gamesFetchStatus = useAppSelector(gamesFetchStatusSelector);

  React.useEffect(() => {
    if (gamesFetchStatus !== "idle") return;
    appDispatch(fetchAllGamesThunk());
  }, [appDispatch, gamesFetchStatus]);

  const fetchTeam = async (): Promise<void> => {
    const headers = await getAuthHeader();
    setLoading(true);
    axios
      .get("/api/teams/list-invitations", { headers: headers })
      .then((res) => {
        const players: IData[] = res.data.result.map((item: any) => {
          const teamLogo = item.team.teamLogo
            ? frontendSupabase.storage
                .from("public-files")
                .getPublicUrl(item.team.teamLogo).publicURL
            : null;
          return {
            username: item.invite_by.username,
            teamname: [teamLogo, item.team.name],
            date: moment(item.created_at).format("DD/MM/YYYY HH:MM"),
            teamId: item.team.id,
            gameId: item.team.game_id,
            invite_key: item.secret,
            message: item.message,
          };
        });
        setData(players);
      })
      .finally(() => setLoading(false));
  };

  const acceptInvitaion = async (invite_key: string): Promise<void> => {
    setLoading(true);
    const headers = await getAuthHeader();
    axios
      .get(`/api/teams/accept-invite?invite_key=${invite_key}`, {
        headers: headers,
      })
      .then(() => {
        fetchTeam();
      })
      .catch(() => {
        alert("Player already added in Watch list");
      })
      .finally(() => setLoading(false));
  };

  const declineInvitaion = async (invite_key: string): Promise<void> => {
    setLoading(true);
    const headers = await getAuthHeader();
    axios
      .get(`/api/teams/reject-invite?invite_key=${invite_key}`, {
        headers: headers,
      })
      .then(() => {
        fetchTeam();
      })
      .catch(() => {
        alert("Invitation already declined");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <React.Fragment>
      <Grid container rowSpacing={2}>
        <Grid item xs={12} sm={12} md={12} mt={8} mb={12}>
          <TableContainer>
            <Table>
              <TableBody>
                {!isMobile ? (
                  <NoobRow>
                    <NoobCell>
                      <Box display="flex" alignItems={"center"}>
                        <Typography marginRight={12}>Sent By</Typography>
                        <Typography>Team Name</Typography>
                      </Box>
                    </NoobCell>
                    <NoobCell>
                      <Typography>Message</Typography>
                    </NoobCell>
                    <NoobCell>
                      <Box display="flex" alignItems={"center"}>
                        <Typography>Game Name</Typography>
                      </Box>
                    </NoobCell>
                    <NoobCell>
                      <Box display="flex" alignItems={"center"}>
                        <Typography>Date</Typography>
                      </Box>
                    </NoobCell>
                    <NoobCell>
                      <Typography></Typography>
                    </NoobCell>
                  </NoobRow>
                ) : null}
                {data.map((item) => {
                  return (
                    <NoobRow
                      sx={{
                        display: { sm: "flex", xs: "flex", md: "table-row" },
                        flexDirection: { sm: "column", xs: "column" },
                      }}
                      key={item.username}
                    >
                      <NoobCell>
                        <Box display="flex" alignItems={"center"}>
                          <Typography marginRight={12}>
                            {item.username}
                          </Typography>
                          {item.teamname[0] ? (
                            <Image
                              src={item.teamname[0] || ""}
                              width={"45px"}
                              height={"45px"}
                            />
                          ) : (
                            <GroupIcon
                              style={{
                                borderRadius: 65,
                                background: "rgba(0,0,0,0.4)",
                                height: 45,
                                width: 45,
                              }}
                            />
                          )}
                          <Typography marginLeft={2}>
                            {item.teamname[1]}
                          </Typography>
                        </Box>
                      </NoobCell>
                      <NoobCell>{item.message}</NoobCell>
                      <NoobCell>
                        <Box display="flex" alignItems={"center"}>
                          <Typography>
                            {
                              games.find((i: any) => i.id === item.gameId)
                                ?.displayName
                            }
                          </Typography>
                        </Box>
                      </NoobCell>
                      <NoobCell>
                        <Box display="flex" alignItems={"center"}>
                          <Typography>{item.date}</Typography>
                        </Box>
                      </NoobCell>
                      {isMobile ? (
                        <>
                          <NoobCell>
                            <NoobButton
                              style={{ backgroundColor: "#F09633" }}
                              variant="contained"
                              size={"small"}
                              fullWidth={true}
                            >
                              Accept Offer
                            </NoobButton>
                          </NoobCell>
                          <NoobCell>
                            <NoobButton
                              style={{ backgroundColor: "#6932F9" }}
                              variant="contained"
                              size={"small"}
                              fullWidth={true}
                            >
                              Decline Offer
                            </NoobButton>
                          </NoobCell>
                        </>
                      ) : (
                        <>
                          <NoobCell>
                            <NoobButton
                              style={{ backgroundColor: "#F09633" }}
                              variant="contained"
                              size={"small"}
                              disabled={loading}
                              onClick={(): void => {
                                acceptInvitaion(item.invite_key);
                              }}
                            >
                              Accept
                            </NoobButton>
                          </NoobCell>
                          <NoobCell>
                            <NoobButton
                              style={{ backgroundColor: "#6932F9" }}
                              variant="contained"
                              size={"small"}
                              disabled={loading}
                              onClick={(): void => {
                                declineInvitaion(item.invite_key);
                              }}
                            >
                              Decline
                            </NoobButton>
                          </NoobCell>
                        </>
                      )}
                    </NoobRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Permissions;
