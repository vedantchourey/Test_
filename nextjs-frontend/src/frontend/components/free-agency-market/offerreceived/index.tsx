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

  const fetchTeam = async () => {
    const headers = await getAuthHeader();
    setLoading(true);
    axios
      .get("/api/teams/list-invitations", { headers: headers })
      .then((res) => {
        console.log('res.data -> ', res.data)
        const players: IData[] = res.data.result.map((item: any) => ({
          username: item.invite_by.username,
          teamname: ["/icons/Rectangle.svg", item.team.name],
          date: moment(item.created_at).format("DD/MM/YYYY HH:MM"),
          teamId: item.team.id,
          invite_key: item.secret
        }));
        setData(players);
      })
      .finally(() => setLoading(false));
  };

  const acceptInvitaion = async (invite_key: string) => {
    setLoading(true);
    const headers = await getAuthHeader();
    axios
      .get(`/api/teams/accept-invite?invite_key=${invite_key}`, {
        headers: headers,
      })
      .then((res) => {
        fetchTeam()
      })
      .catch((err) => {
        alert("Player already added in Watch list");
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
                        <Typography marginRight={12}>Username</Typography>
                        <Typography>Team Name</Typography>
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
                          <img
                            src={item.teamname[0]}
                            width={"65px"}
                            height={"65px"}
                          />
                          <Typography marginLeft={2}>
                            {item.teamname[1]}
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
                        <NoobCell>
                          <NoobButton
                            style={{ backgroundColor: "#F09633" }}
                            variant="contained"
                            size={"small"}
                            disabled={loading}
                            onClick={() => acceptInvitaion(item.invite_key)}
                          >
                            Accpet
                          </NoobButton>
                        </NoobCell>
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
