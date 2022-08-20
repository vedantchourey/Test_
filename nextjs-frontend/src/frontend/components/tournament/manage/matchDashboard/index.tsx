import styled from "@emotion/styled";
import {
  Button,
  Chip,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { TournamentData } from "../..";
import { ReactComponent as CircleCloseIcon } from "../../../../../../public/icons/close.svg";
import { getAuthHeader } from "../../../../utils/headers";
import AccordionAlt from "../../../ui-components/accordion";
import CardLayout from "../../../ui-components/card-layout";

export const HeadCell = styled(TableCell)(() => ({
  alignItems: "center",
  border: "none",
}));

export const NoobCell = styled(TableCell)(() => ({
  alignItems: "center",
  color: "rgba(229, 229, 229, 0.5)",
  border: "none",
}));

export const NoobRow = styled(TableRow)(() => ({
  align: "center",
}));

export interface Tournament {
  id: number;
  tournamentId: number;
  matchId: number;
  status: string;
  reason: string;
  reportedBy: TournamentReporter;
  createdAt: Date;
}

export interface TournamentReporter {
  stateId: string;
  lastName: string;
  username: string;
  countryId: string;
  firstName: string;
  agreeToTnc: boolean;
  dateOfBirth: Date;
}

export const calculateDiff = (createdAt: Date): string => {
  const today_date = new Date();
  const days = moment(today_date).diff(moment(createdAt), "days");
  return String(days);
};

const MatchDashboard: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  const [tournamentdata, setData] = React.useState<Tournament[]>([]);
  const [resultReq, setResultReq] = React.useState<any[]>([]);
  const [popVisible, setPopupVisible] = React.useState<boolean>(false);
  const [matchData, setMatchData] = React.useState<any>(undefined);
  const [matchIssueModal, setMatchIssueModal] = React.useState<any>(null);
  const [image, setImage] = React.useState<string>("");
  const [winnerId, setWinnerId] = React.useState<any>(null);
  const [tournamentDetails, setTournamentDetails] =
    React.useState<TournamentData | null>(null);

  const autoSeedBrackets = async (): Promise<void> => {
    const findFirstRound = tournamentDetails?.brackets.round.find(
      (i: any) => i.number === 1
    );
    const findFirstRoundMatch: any[] = tournamentDetails?.brackets.match
      .filter((i: any) => i.round_id === findFirstRound.id)
      .map((m: any) => {
        const opponent1Player = tournamentDetails?.brackets.participant.find(
          (p: any) => m.opponent1.id === p.user_id || m.opponent1.id === p.id
        );
        const opponent2Player = tournamentDetails?.brackets.participant.find(
          (p: any) => m.opponent2.id === p.user_id || m.opponent2.id === p.id
        );
        return {
          ...m,
          opponent1: {
            ...m.opponent1,
            player: opponent1Player.user_id || opponent1Player.team_id,
          },
          opponent2: {
            ...m.opponent2,
            player: opponent2Player.user_id || opponent2Player.team_id,
          },
        };
      })
      .filter(
        (m: any) => m.opponent1.player !== null && m.opponent2.player === null
      );

    const setResult: any[] = findFirstRoundMatch.map((m) => {
      return {
        ...m,
        match_id: m.id,
        tournament_id: tournamentDetails?.id,
        status: "RESOLVED",
        forceUpdate: true,
        opponent1: {
          id: m.opponent1.id,
          position: m.opponent1.position,
          score: 1,
          result: "win",
          user_id: m.opponent1.player,
        },
        opponent2: {
          id: m.opponent2.id,
          position: m.opponent2.position,
          score: 0,
          result: "loss",
          user_id: m.opponent2.player,
        },
      };
    });

    const endpoint = "/api/tournaments/match-result";
    const headers = await getAuthHeader();

    await Promise.any(
      setResult.map((match) =>
        axios
          .patch(
            endpoint,
            {
              ...match,
            },
            { headers: headers }
          )
          .catch((err) => console.warn(err)))
    );

    alert("Auto seeding completed");
  };

  const fetchAllDetails = (): void => {
    axios
      .get(`/api/tournaments/${router.query.id}/details`)
      .then((res) => {
        if (res.data.data) {
          const tournamentData = res.data.data;
          Object.keys(tournamentData).forEach((key) => {
            if (tournamentData[key] === null) {
              delete tournamentData[key];
            }
          });

          setTournamentDetails({
            ...tournamentData,
            basic: {
              name: tournamentData.name,
              about: tournamentData.about,
              game: tournamentData.game,
              startDate: tournamentData.startDate,
              startTime: moment(tournamentData.startTime, "hh:mm:ss").toDate(),
              banner: tournamentData.banner,
              sponsor: tournamentData.sponsor,
              createTemplateCode: tournamentData.createTemplateCode,
              cloneTournament: tournamentData.createTemplateCode !== undefined,
            },
            publishData: {
              society: tournamentData.joinStatus,
              registration: tournamentData.status,
            },
          } as TournamentData);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const tournamentList = async (): Promise<void> => {
    try {
      const endpoint = "/api/match-dispute/list";
      const headers = await getAuthHeader();
      axios
        .get(endpoint, { params: { tournamentId: id }, headers: headers })
        .then((res) => {
          setData(res.data);
        });
    } catch (err) {
      alert(err);
    }
  };
  const fetchMatchResultReq = async (): Promise<void> => {
    try {
      const endpoint = "/api/tournaments/match-result";
      const headers = await getAuthHeader();
      axios
        .get(endpoint, { params: { tournament_id: id }, headers: headers })
        .then((res) => {
          setResultReq(res.data);
        });
    } catch (err) {
      alert(err);
    }
  };
  React.useEffect(() => {
    tournamentList();
    fetchMatchResultReq();
    fetchAllDetails();
  }, []);

  const resolveDispute = async (id: any): Promise<void> => {
    const endpoint = "/api/match-dispute/update";
    const headers = await getAuthHeader();
    axios
      .patch(endpoint, { id, status: "RESOLVED" }, { headers: headers })
      .then(() => {
        tournamentList();
      });
  };

  const fetchMatch = async (item: any): Promise<void> => {
    try {
      const endpoint = `/api/tournaments/${item.tournamentId}/${item.matchId}`;
      const headers = await getAuthHeader();
      axios
        .get(endpoint, { params: { tournament_id: id }, headers: headers })
        .then((res) => {
          setMatchData(res.data);
          setMatchIssueModal(item);
          // setResultReq(res.data);
        });
    } catch (err) {
      alert(err);
    }
  };
  React.useEffect(() => {
    tournamentList();
    fetchMatchResultReq();
  }, []);

  const updateResult = async ({
    id,
    tournament_id,
    draw,
    opponent1_id,
    winnerId,
  }: any): Promise<void> => {
    let op1Result,
      op2Result,
      op1Score = 0,
      op2Score = 0;
    if (draw) {
      op1Result = "draw";
      op2Result = "draw";
    } else if (winnerId === opponent1_id) {
      op1Result = "win";
      op2Result = "lose";
      op1Score = 1;
    } else {
      op1Result = "lose";
      op2Result = "win";
      op2Score = 1;
    }

    const endpoint = "/api/tournaments/match-result";
    const headers = await getAuthHeader();
    axios
      .patch(
        endpoint,
        {
          id,
          match_id: id,
          status: "RESOLVED",
          tournament_id,
          forceUpdate: true,
          opponent1: {
            user_id: matchData?.opponent1?.[0]?.user_id,
            score: op1Score,
            result: op1Result,
          },
          opponent2: {
            user_id: matchData?.opponent1?.[0]?.user_id,
            score: op2Score,
            result: op2Result,
          },
        },
        { headers: headers }
      )
      .then(() => {
        fetchMatchResultReq();
        resolveDispute(matchIssueModal.id);
        tournamentList();
        fetchMatchResultReq();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setMatchIssueModal(null);
        setMatchData(null);
      });
  };

  const acceptResult = async ({ id, tournament_id }: any): Promise<void> => {
    const endpoint = "/api/tournaments/match-result";
    const headers = await getAuthHeader();
    axios
      .patch(
        endpoint,
        { id, status: "RESOLVED", tournament_id },
        { headers: headers }
      )
      .then(() => {
        fetchMatchResultReq();
      });
  };

  const toggle = (data: string): void => {
    setImage(data);
    setPopupVisible(!popVisible);
  };
  return (
    <React.Fragment>
      <Button onClick={(): any => autoSeedBrackets()} variant="outlined">
        Auto Seed
      </Button>
      <AccordionAlt
        title="MATCH DISTIPUTES"
        icon={{ expanded: <CircleCloseIcon /> }}
      >
        <CardLayout title="Match Distiputes">
          <Grid container rowSpacing={1} columnSpacing={5}>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableBody>
                    <NoobRow>
                      <HeadCell>
                        <Typography align="left">Match</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Type of Report</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Reporter</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Status</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Assign</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Action</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Time Since Report</Typography>
                      </HeadCell>
                    </NoobRow>
                    {tournamentdata.map((item) => {
                      return (
                        <NoobRow key={item.id}>
                          <NoobCell>
                            <Typography>{item?.matchId}</Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>{item?.reason}</Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>
                              {item?.reportedBy?.firstName}{" "}
                              {item?.reportedBy?.lastName}
                            </Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>
                              <Chip
                                label={item.status}
                                color={
                                  item.status === "PENDING"
                                    ? "warning"
                                    : "success"
                                }
                              />
                            </Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>co-admin</Typography>
                          </NoobCell>
                          {item.status === "PENDING" ? (
                            <NoobCell>
                              <Typography>
                                <Button onClick={(): any => fetchMatch(item)}>
                                  Resolve
                                </Button>
                              </Typography>
                            </NoobCell>
                          ) : (
                            <>
                              <Typography></Typography>
                            </>
                          )}
                          <NoobCell>
                            <Typography>
                              {moment(item.createdAt).fromNow()}
                            </Typography>
                          </NoobCell>
                        </NoobRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardLayout>
      </AccordionAlt>
      <AccordionAlt
        title="MATCH RESULT REQUEST"
        icon={{ expanded: <CircleCloseIcon /> }}
      >
        <CardLayout title="Match Result Request">
          <Grid container rowSpacing={1} columnSpacing={5}>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableBody>
                    <NoobRow>
                      <HeadCell>
                        <Typography align="left">Match</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Opponent 1 Score</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Opponent 2 Score</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Status</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Action</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>View Image</Typography>
                      </HeadCell>
                    </NoobRow>
                    {resultReq.map((item) => {
                      return (
                        <NoobRow key={item.id}>
                          <NoobCell>
                            <Typography>{item.match_id}</Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography
                              color={
                                item?.opponent1?.score === 0 ? "red" : "green"
                              }
                            >
                              {item?.opponent1?.player?.username}
                            </Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography
                              color={
                                item?.opponent2?.score === 0 ? "red" : "green"
                              }
                            >
                              {item?.opponent2?.player?.username}
                            </Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>
                              <Chip
                                label={item.result_status}
                                color={
                                  item.result_status === "ACCEPTED"
                                    ? "success"
                                    : "warning"
                                }
                              />
                            </Typography>
                          </NoobCell>

                          {item.result_status === "PENDING" ? (
                            <NoobCell>
                              <Typography>
                                <Button onClick={(): any => acceptResult(item)}>
                                  Resolve
                                </Button>
                              </Typography>
                            </NoobCell>
                          ) : (
                            <>
                              <Typography></Typography>
                            </>
                          )}
                          <NoobCell>
                            <Button
                              onClick={(): any => toggle(item.screenshot)}
                            >
                              View
                            </Button>
                          </NoobCell>
                        </NoobRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardLayout>
      </AccordionAlt>
      <Dialog open={Boolean(matchIssueModal)}>
        <Box minWidth={500} p={2}>
          <Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Winner
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={winnerId}
                  label="Select Winner"
                  onChange={(e): any => setWinnerId(e.target.value)}
                >
                  <MenuItem value={matchData?.opponent1?.[0]?.user_id}>
                    {matchData?.opponent1?.[0]
                      ? matchData?.opponent1?.[0]?.firstName +
                        " " +
                        matchData?.opponent1?.[0]?.lastName
                      : "NA"}
                  </MenuItem>
                  <MenuItem value={matchData?.opponent2?.[0]?.user_id}>
                    {matchData?.opponent2?.[0]
                      ? matchData?.opponent2?.[0]?.firstName +
                        " " +
                        matchData?.opponent2?.[0]?.lastName
                      : "NA"}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button onClick={(): any => setMatchIssueModal(null)}>Close</Button>
            <Button
              onClick={(): any =>
                updateResult({
                  id: matchIssueModal.matchId,
                  tournament_id: matchIssueModal.tournamentId,
                  draw: false,
                  opponent1_id: matchData?.opponent1?.[0]?.id,
                  winnerId: "",
                })
              }
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog
        open={popVisible}
        onClose={(): void => toggle("")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <img height={"70%"} src={image} />
      </Dialog>
      <Box display="flex" justifyContent={"flex-end"}>
        <Button variant="contained"> Send </Button>
      </Box>
    </React.Fragment>
  );
};

export default MatchDashboard;
